const minimumPtsInput = document.getElementById("minimumPtsInput")
const maxLineupsInput = document.getElementById("maxLineups")
const bench1Select = document.getElementById("bench1Select")
const bench2Select = document.getElementById("bench2Select")
const captainSelect = document.getElementById("captainSelect")
const flex1Select = document.getElementById("flex1Select")
const flex2Select = document.getElementById("flex2Select")
const flex3Select = document.getElementById("flex3Select")
const flex4Select = document.getElementById("flex4Select")
const flex5Select = document.getElementById("flex5Select")
const msgPlaceholder = document.querySelector(".msgPlaceholder")
const startsSitsTitleArea = document.querySelector(".starts-sits__title-area")
const startsSitsToggle = document.querySelector(".starts-sits__toggle")
const startsSitsClose = document.querySelector(".starts-sits__close")
const startsSitsClear = document.querySelector(".starts-sits__clear")
const startsSitsInputContainer = document.querySelector(".starts-sits__inputs-container")
const sits1 = document.querySelector(".sits1")

const generateBtn = document.querySelector(".generate-button")
const loadingContainer = document.querySelector(".loading-container")
const dotsLoading = document.querySelector(".dots-loading")
const cancelBtn = document.querySelector(".cancel-button")

const ourForm = document.getElementById("ourForm")
// const maxLineupsToCheck = 20000
// 2 million is about 12 seconds
const salaryMax = 50000

let overPtsTarget = false
let underSalaryCap = false
let conditionsMet = false

let i = 1
let foundLineup
let runTime

// set slate and last updated
document.querySelector(".slate").innerText = info.captainSlate
document.querySelector(".updated").innerText = info.lastUpdated

const trimmedPlayerData = captainPlayerData.map(player => {
  return {
    name: player.name.trim(),
    pos: player.pos.trim(),
    salary: player.salary,
    team: player.team.trim(),
    proj: player.proj
  }
})

//console.log(`trimmedPlayerData has the type of: ${typeof trimmedPlayerData}`)

// Add start and bench select options
// Captain Mode uses Bench Select Function Since All Positions in Play
// Updated this function from Classic to sort in ABC order]

function addBenchSelectOptions(selectVariable) {
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
  ${trimmedPlayerData.map(player => {
    return `<option value="${player.name}">${player.name}</option>`
  })}
  `
}
addBenchSelectOptions(captainSelect)
addBenchSelectOptions(flex1Select)
addBenchSelectOptions(flex2Select)
addBenchSelectOptions(flex3Select)
addBenchSelectOptions(flex4Select)
addBenchSelectOptions(flex5Select)
addBenchSelectOptions(bench1Select)
addBenchSelectOptions(bench2Select)

startsSitsTitleArea.addEventListener("click", () => {
  startsSitsInputContainer.classList.toggle("active")
  startsSitsToggle.classList.toggle("active")
})

startsSitsClear.addEventListener("click", () => {
  captainSelect.selectedIndex = 0
  flex1Select.selectedIndex = 0
  flex2Select.selectedIndex = 0
  flex3Select.selectedIndex = 0
  flex4Select.selectedIndex = 0
  flex5Select.selectedIndex = 0
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

msgPlaceholder.addEventListener("click", e => {
  if (e.target.hasAttribute("data-closeBtn")) {
    e.target.parentElement.remove()
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

  let captainStart = captainSelect.value
  let flex1Start = flex1Select.value
  let flex2Start = flex2Select.value
  let flex3Start = flex3Select.value
  let flex4Start = flex4Select.value
  let flex5Start = flex5Select.value
  let bench1 = bench1Select.value
  let bench2 = bench2Select.value

  let sitStarts = [captainStart, flex1Start, flex2Start, flex3Start, flex4Start, flex5Start]

  let startSitsWarningMsgs = ["Umm...", "Hmm...", "Error", "Whoops...", "Uh-oh", "Oops", "Err...", "Sigh..."]

  // need validation to prevent duplicates in sitStarts Array
  // Need to handle for empty strings

  // define checkForDuplicates
  function checkForDuplicates(array) {
    let valuesAlreadySeen = []

    for (let i = 0; i < array.length; i++) {
      let value = array[i]
      if (value !== "" && valuesAlreadySeen.indexOf(value) !== -1) {
        removeLoading()
        captainStart.selectedIndex = 0
        flex1Start.selectedIndex = 0
        flex2Start.selectedIndex = 0
        flex3Start.selectedIndex = 0
        flex4Start.selectedIndex = 0
        flex5Start.selectedIndex = 0
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
        return true
      }
      valuesAlreadySeen.push(value)
    }
    return false
  }

  checkForDuplicates(sitStarts)

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

  // define
  function areAllTeamsEqual(testLineup) {
    let result = testLineup.every(playerObj => {
      return playerObj.team === testLineup[0].team
    })
    return result
  }

  // cannot check all starts have same team in form validation because the select value and then sit Starts does not know the team the player is on
  if (!sitStarts.includes("")) {
    console.log("All Starts Filled")
    // check they are not all on the same team
    // if so then show a message
    let fullStartsLineup = trimmedPlayerData.filter(y => y.name === sitStarts[0] || y.name === sitStarts[1] || y.name === sitStarts[2] || y.name === sitStarts[3] || y.name === sitStarts[4] || y.name === sitStarts[5])
    console.log(fullStartsLineup)
    let allPlayersOnSameTeam = areAllTeamsEqual(fullStartsLineup)
    console.log(allPlayersOnSameTeam)
    if (allPlayersOnSameTeam) {
      captainStart.selectedIndex = 0
      flex1Start.selectedIndex = 0
      flex2Start.selectedIndex = 0
      flex3Start.selectedIndex = 0
      flex4Start.selectedIndex = 0
      flex5Start.selectedIndex = 0
      removeLoading()
      //show error message
      let failedValiMsg = `

      <div class="messageContainer" id="messageContainer">
    <div class="message-text-container">
    <h3 class="message-text-headline">${startSitsWarningMsgs[Math.floor(Math.random() * startSitsWarningMsgs.length)]}</h3>
    <button class="closeBtn" data-closeBtn>&times;</button>
      </div>
      <p>Lineups for this game style must include players from both teams. Please fix before continuing.</p>
    </div>
      `

      msgPlaceholder.insertAdjacentHTML("afterbegin", failedValiMsg) //
      document.querySelector(".closeBtn").focus()
      return
    }
  }

  // start timer
  startTime = Date.now()

  generateBtn.innerText = "Searching..."

  // Make disable button disabled
  // need propogation
  generateBtn.disabled = true

  //grab minPts value
  let minimumPts = parseFloat(minimumPtsInput.value)
  //console.log(minimumPts)

  // make loading container active
  loadingContainer.classList.add("active")

  // Add dots loading animation
  dotsLoading.classList.add("active")

  // Make cancel button visible
  // use a slight delay to avoid flashing
  cancelBtn.classList.add("active")

  cancelBtn.focus()

  //grab maxLineupsToCheck Value
  let maxLineupsToCheck = parseInt(maxLineupsInput.value)
  //console.log(`Max Lineups to Check from handleClick: ${maxLineupsToCheck}`)

  // remove sits should be the first part
  let trimmedAndBenchedPlayerData = trimmedPlayerData.filter(y => y.name !== bench1 && y.name !== bench2)

  // multiply salary and proj values
  // set captain
  let captPlayerPool = trimmedAndBenchedPlayerData.map(player => {
    return {
      name: player.name,
      pos: player.pos,
      salary: player.salary * 1.5,
      team: player.team,
      proj: player.proj * 1.5
    }
  })

  // define object to send to worker
  let workerData = {
    salaryMax,
    maxLineupsToCheck,
    minimumPts,
    sitStarts,
    trimmedAndBenchedPlayerData,
    captPlayerPool
  }

  // instantiate worker to run loop and send it the necessary data
  const myWorker = new Worker("captain-worker.js")
  myWorker.postMessage(workerData)

  // Add Listener for cancel button
  cancelBtn.addEventListener("click", () => {
    removeLoading()
    myWorker.terminate()
  })

  // receive the data back from the worker
  myWorker.onmessage = function (e) {
    // console.log(e.data)
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
      }, 500)
    } else {
      removeLoading()
      showAlertIfNothingFound(maxLineupsToCheck, runTime)
    }
  } // closes onmessage
} // closes handle click

function removeLoading() {
  generateBtn.innerText = "Generate"
  generateBtn.disabled = false
  loadingContainer.classList.remove("active")
  dotsLoading.classList.remove("active")
  cancelBtn.classList.remove("active")
  generateBtn.focus()
}

function showLineupCard(testLineup, runTime, i, testLineupProjectedPts, testLineupSalary) {
  let positions = ["CAPTAIN", "FLEX1", "FLEX2", "FLEX3", "FLEX4", "FLEX5"]

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
  <p class="card--specs">Found in ${runTime.toFixed(1)} seconds after checking ${i.toLocaleString()} random lineup(s).</p>
  </div>
`
  ourLineupContainer.insertAdjacentHTML("afterbegin", ourHTML)
} // end Show lineup Card FN def

function showAlertIfNothingFound(maxLineupsToCheck) {
  // see if "no lineups found" message needs to be shown

  let notFoundMsg = ["Empty Handed", "Nothing", "Didn't Happen", "Try Again", "No Lineup Found", "Nada", "Zilch", "Meh", "Ugh", "Almost?", "Hmm..."]
  if (i >= maxLineupsToCheck && conditionsMet == false) {
    let finishTime = Date.now()
    let runTime = (finishTime - startTime) / 1000
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
  }
}
// end showAlert function
