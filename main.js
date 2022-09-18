const minimumPtsInput = document.getElementById("minimumPtsInput")
const maxLineupsInput = document.getElementById("maxLineups")
const bench1Select = document.getElementById("bench1Select")
const bench2Select = document.getElementById("bench2Select")
const qbSelect = document.getElementById("qbSelect")
const rbSelect = document.getElementById("rbSelect")

const wrSelect = document.getElementById("wrSelect")
const teSelect = document.getElementById("teSelect")
const dstSelect = document.getElementById("dstSelect")
const msgPlaceholder = document.querySelector(".msgPlaceholder")
const startsSitsTitleArea = document.querySelector(".starts-sits__title-area")
const startsSitsToggle = document.querySelector(".starts-sits__toggle")
const startsSitsClose = document.querySelector(".starts-sits__close")
const startsSitsClear = document.querySelector(".starts-sits__clear")
const startsSitsInputContainer = document.querySelector(".starts-sits__inputs-container")
const generateBtn = document.querySelector(".generate-button")
const loadingContainer = document.querySelector(".loading-container")
const dotsLoading = document.querySelector(".dots-loading")
const cancelBtn = document.querySelector(".cancel-button")
const ourForm = document.getElementById("ourForm")

const salaryMax = 50000

let overPtsTarget = false
let underSalaryCap = false
let conditionsMet = false
let startTime
let i = 1
let foundLineup
let runTime

// set slate and last updated
document.querySelector(".slate").innerText = info.mainSlate
document.querySelector(".updated").innerText = info.lastUpdated

// trim data source
const trimmedPlayerData = playerData.map(player => {
  return {
    name: player.name.trim(),
    pos: player.pos.trim(),
    salary: player.salary,
    team: player.team.trim(),
    proj: player.proj
  }
})

// Add start select options
function addStartSelectOptions(selectVariable, positionString) {
  trimmedPlayerData.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }
    if (a.name < b.name) {
      return -1
    }
  })
  selectVariable.innerHTML = `
  <option value="">Select</option>
  ${trimmedPlayerData
    .filter(x => x.pos == positionString)
    .map(player => {
      return `<option value="${player.name}">${player.name}</option>`
    })}
    `
}

addStartSelectOptions(qbSelect, "QB")
addStartSelectOptions(rbSelect, "RB")
addStartSelectOptions(wrSelect, "WR")
addStartSelectOptions(teSelect, "TE")
addStartSelectOptions(dstSelect, "DST")

// Add bench select options
function addBenchSelectOptions(selectVariable) {
  //console.log(trimmedPlayerData)
  selectVariable.innerHTML = `
  <option value="">Select</option>
  ${trimmedPlayerData.map(player => {
    return `<option value="${player.name}">${player.name}</option>`
  })}
  `
}
addBenchSelectOptions(bench1Select)
addBenchSelectOptions(bench2Select)

startsSitsTitleArea.addEventListener("click", () => {
  startsSitsInputContainer.classList.toggle("active")
  startsSitsToggle.classList.toggle("active")
})

startsSitsClear.addEventListener("click", () => {
  qbSelect.selectedIndex = 0
  rbSelect.selectedIndex = 0
  wrSelect.selectedIndex = 0
  teSelect.selectedIndex = 0
  dstSelect.selectedIndex = 0
  bench1Select.selectedIndex = 0
  bench2Select.selectedIndex = 0
  startsSitsInputContainer.classList.toggle("active")
  startsSitsToggle.classList.toggle("active")
  goTop()
  generateBtn.focus()
})

startsSitsClose.addEventListener("click", () => {
  startsSitsInputContainer.classList.toggle("active")
  startsSitsToggle.classList.toggle("active")
  goTop()
  generateBtn.focus()
})

msgPlaceholder.addEventListener("click", e => {
  if (e.target.hasAttribute("data-closeBtn")) {
    e.target.parentElement.parentElement.remove()
    minimumPtsInput.focus()
  }
})

ourForm.addEventListener("submit", handleClick)

function goTop() {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}

function handleClick(e) {
  // ensure button click working
  //console.log("button clicked")

  // prevents page reload on form submit;
  e.preventDefault()

  // clear existing message if there is one
  msgPlaceholder.innerHTML = ""

  let qbStart = qbSelect.value
  let rbStart = rbSelect.value
  let wrStart = wrSelect.value
  let teStart = teSelect.value
  let dstStart = dstSelect.value
  let bench1 = bench1Select.value
  let bench2 = bench2Select.value

  let sitStarts = [qbStart, rbStart, wrStart, teStart, dstStart]

  let startSitsWarningMsgs = ["Umm...", "Hmm...", "Error", "Whoops...", "Uh-oh", "Oops", "Err...", "Sigh..."]

  // form validation needed here to make sure there are no matches and if so send message and return. Need to handle for empty strings as well.
  if ((bench1 !== "" && sitStarts.includes(bench1)) || (bench2 !== "" && sitStarts.includes(bench2)) || (bench2 === bench1 && bench1 !== "" && bench2 !== "")) {
    removeLoading()
    bench1Select.selectedIndex = 0
    bench2Select.selectedIndex = 0
    //show error message
    let failedValiMsg = `
    <div class="messageContainer" id="messageContainer">
    <div class="message-text-container">
    <h3 class="message-text-headline">${startSitsWarningMsgs[Math.floor(Math.random() * startSitsWarningMsgs.length)]}</h3>
    <button class="closeBtn" data-closeBtn>&times;</button>
      </div>
      <p>Cannot start and sit the same player and/or bench the same player twice.</p>
    </div>
    `

    msgPlaceholder.insertAdjacentHTML("afterbegin", failedValiMsg) //
    document.querySelector(".closeBtn").focus()
    return
  }

  // start timer
  startTime = Date.now()

  // Make disable button disabled
  // need propogation
  generateBtn.disabled = true

  //grab minPts value
  let minimumPts = parseFloat(minimumPtsInput.value)
  //console.log(minimumPts)

  // in the if statement to help prevent flashing
  if (minimumPts >= 0) {
    //console.log("Min Pts >= 0")

    //change button text
    generateBtn.innerText = "Searching..."

    // make loading container active
    loadingContainer.classList.add("active")

    // Add dots loading animation
    dotsLoading.classList.add("active")

    // Make cancel button visible
    // use a slight delay to avoid flashing
    cancelBtn.classList.add("active")
  }

  cancelBtn.focus()

  //grab maxLineupsToCheck Value
  let maxLineupsToCheck = parseInt(maxLineupsInput.value)
  //console.log(`Max Lineups to Check from handleClick: ${maxLineupsToCheck}`)

  // remove sits should be the first part
  let trimmedAndBenchedPlayerData = trimmedPlayerData.filter(y => y.name != bench1 && y.name != bench2)

  if (sitStarts[0] !== "") {
    trimmedAndBenchedPlayerData = trimmedAndBenchedPlayerData.filter(playerObj => {
      return playerObj.name === sitStarts[0] || playerObj.pos === "RB" || playerObj.pos === "WR" || playerObj.pos === "TE" || playerObj.pos === "FLEX" || playerObj.pos === "DST"
    })
  }

  // If DST is started remove other DSTs
  if (sitStarts[4] !== "") {
    trimmedAndBenchedPlayerData = trimmedAndBenchedPlayerData.filter(playerObj => {
      return playerObj.pos === "QB" || playerObj.pos === "RB" || playerObj.pos === "WR" || playerObj.pos === "TE" || playerObj.pos === "FLEX" || playerObj.name === sitStarts[4]
    })
  }

  // define object to send to worker
  let workerData = {
    salaryMax,
    maxLineupsToCheck,
    minimumPts,
    sitStarts,
    trimmedAndBenchedPlayerData
  }

  // instantiate worker to run loop and send it the necessary data
  const myWorker = new Worker("worker.js")
  myWorker.postMessage(workerData)

  // Add Listener for cancel button
  cancelBtn.addEventListener("click", () => {
    myWorker.terminate()
    removeLoading()
  })

  // receive the data back from the worker
  myWorker.onmessage = function (e) {
    //console.log(e.data)
    runTime = e.data.runTime
    foundLineup = e.data.testLineup
    i = e.data.i
    conditionsMet = e.data.conditionsMet
    testLineupProjectedPts = e.data.testLineupProjectedPts
    testLineupSalary = e.data.testLineupSalary

    if (foundLineup != null) {
      // showLineupCard(foundLineup, runTime, i, testLineupProjectedPts, testLineupSalary)
      setTimeout(() => {
        removeLoading()
        showLineupCard(foundLineup, runTime, i, testLineupProjectedPts, testLineupSalary)
      }, 400)
    } else {
      removeLoading()
      showAlertIfNothingFound(maxLineupsToCheck, runTime)
    }
  }
} // closes handle click function definition

function removeLoading() {
  generateBtn.innerText = "Generate"
  generateBtn.disabled = false
  loadingContainer.classList.remove("active")
  dotsLoading.classList.remove("active")
  cancelBtn.classList.remove("active")
  generateBtn.focus()
}

function showLineupCard(testLineup, runTime, i, testLineupProjectedPts, testLineupSalary) {
  let positions = ["QB", "RB1", "RB2", "WR1", "WR2", "WR3", "TE", "FLEX", "DST"]

  let ourHTML = `
    <div class="card">
                
    <div class="card--title-area">
    <p class="card--total">Projected Points: <span>${testLineupProjectedPts.toFixed(2)}</span></p>
    <p class="card--total">Total Salary: <span>$${testLineupSalary.toLocaleString()}</span></p>
    </div>

    <table>
        <thead><tr><th>POS</th><th>PLAYER</th><th class="centered">TEAM</th><th class="centered">PROJ</th><th class="centered">SALARY</th></tr></thead>
            <tbody>        
            ${positions
              .map((pos, i) => {
                return `
                <tr>
                  <td>${pos}</td>
                  <td>${testLineup[i].name}</td>
                  <td>${testLineup[i].team}</td>
                  <td class="centered">${testLineup[i].proj.toFixed(1)}</td>
                  <td class="centered">$${testLineup[i].salary.toLocaleString()}</td>
                </tr>
              `
              })
              .join("")}
            </tbody>
        </table>
        <p class="card--specs">Found in ${runTime} seconds after checking ${i.toLocaleString()} random lineup(s).</p>
        </div>
    `
  ourLineupContainer.insertAdjacentHTML("afterbegin", ourHTML)
} // end define showLineupCard function

function showAlertIfNothingFound(maxLineupsToCheck, runTime) {
  let notFoundMsg = ["Empty Handed", "Nothing", "Didn't Happen", "Try Again", "No Lineup Found", "Nada", "Zilch", "Meh", "Ugh", "Almost?", "Hmm..."]

  //show alert if nothing is found
  let warningMessageHTML = `
    <div class="messageContainer" id="messageContainer">
    <div class="message-text-container">
    <h3 class="message-text-headline">${notFoundMsg[Math.floor(Math.random() * notFoundMsg.length)]}</h3>
    <button class="closeBtn" data-closeBtn>&times;</button>
      </div>
      <p>Try again or lower the minimum projected points value.</p>
      <p>No lineup found meeting the "Minimum Projected Points" value selected - analyzed ${maxLineupsToCheck.toLocaleString()} random lineups in ${runTime.toFixed(0)} seconds.</p>
    </div>
    `

  msgPlaceholder.insertAdjacentHTML("afterbegin", warningMessageHTML) //
  document.querySelector(".closeBtn").focus()
} // end showAlertIfNothingFound function definition
