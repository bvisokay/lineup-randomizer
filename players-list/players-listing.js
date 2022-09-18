playersList = document.querySelector(".players-list")
earlyPlayersList = document.querySelector(".early-players-list")
latePlayersList = document.querySelector(".late-players-list")

let allPlayersHTML = `
<div class="card player-listing">
                
<div class="card--title-area player-listing">
<button type="button" class="filter-buttons">ALL</button>
<button type="button" class="filter-buttons">QB</button>
<button type="button" class="filter-buttons">WR</button>
<button type="button" class="filter-buttons">RB</button>
<button type="button" class="filter-buttons">TE</button>
<button type="button" class="filter-buttons">FLEX</button>
<button type="button" class="filter-buttons">DST</button>
</div>

<table class="player-listing">
    <thead>
    <tr>
      <th class="centered">POS</th>
      <th class="name">PLAYER</th>
      <th class="centered">TEAM</th>
      <th class="centered">SALARY</th>
      <th class="centered">PROJ</th>
      <th class="centered">CPP</th>
      <tr>
    </thead>
        <tbody class="main">
  
        ${playerData
          /* .filter(playerObj => playerObj.pos.trim() === "WR") */
          /*     .sort((a, b) => {
            if (a.cpp > b.cpp) return 1
            else {
              return -1
            }
          }) */
          .map(playerObj => {
            /* if(cpp < 400 ) {
              let rank = "darkGreen"
            } */

            return `
            <tr>
              <td class="centered">${playerObj.pos}</td>
              <td class="name">${playerObj.name}</td>
              <td class="centered">${playerObj.team}</td>
              <td class="centered">$${playerObj.salary.toLocaleString()}</td>
              <td class="centered">${playerObj.proj.toFixed(1)}</td>
              <td class="centered">${playerObj.cpp.toFixed(1)}</td>
            </tr>
          `
          })
          .join("")}
        </tbody>
    </table>
    <p class="card--specs">This is the card specs area</p>
    </div>
`
/*    ${playerData
    .map(playerObj => {
      return `<li>${playerObj.name}</li>`
    })
    .join("")}  */
playersList.insertAdjacentHTML("afterbegin", allPlayersHTML)

// grab the filter buttons
const filterButtons = Array.from(document.querySelector(".card--title-area.player-listing").children)
//console.log(filterButtons)

// Add a click listener to each filter button
filterButtons.forEach(button => {
  button.addEventListener("click", e => {
    let pos = e.target.textContent.trim()
    filterByPos(playerData, pos)
    //alert(`${e.target.textContent.trim()} was clicked`)
  })
})

// using forEach, add a click listener to each button in the ".card--title-area.player-listing"

// the function that runs need to take the parent ELements inner text and pass it as an argument to the function

//need to make this flexible so can pas the pos from the array of
function filterByPos(arrayOfObj, pos) {
  let filteredArray
  console.log("filterbyPos function Ran.")

  //remove existing content or rows-specifically from the DOM
  const tBody = document.querySelector(".main")
  const rows = Array.from(tBody.querySelectorAll("tr"))

  // add back in

  if (pos === "QB") {
    // alert("QB eas clicked")
    filteredArray = arrayOfObj.filter(a => {
      a.name === "QB"
    })
  }

  //remove here

  tBody.innerHTML = ""

  // add back

  let filteredRowHTML = `
  ${filteredArray
    .map(playerObj => {
      return `
            <tr>
              <td class="centered">${playerObj.pos}</td>
              <td class="name">${playerObj.name}</td>
              <td class="centered">${playerObj.team}</td>
              <td class="centered">$${playerObj.salary.toLocaleString()}</td>
              <td class="centered">${playerObj.proj.toFixed(1)}</td>
              <td class="centered">${playerObj.cpp.toFixed(1)}</td>
            </tr>
          `
    })
    .join("")}
  `

  tBody.insertAdjacentHTML("afterbegin", filteredRowHTML)
}

/* Will only work with one tbody element inside the table */
function sortTableByColummn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1
  const tBody = document.querySelector(".main")
  /* store in Array instead of nodeList */
  const rows = Array.from(tBody.querySelectorAll("tr"))

  //Sot each row
  const sortedRows = rows.sort((a, b) => {
    //console.log(a)
    //console.log(b)
    const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim()
    const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim()

    if (aColText > bColText) {
      return 1 * dirModifier
    } else {
      return -1 * dirModifier
    }
  })

  //console.log(sortedRows)

  //remove all exiting TRs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild)
  }

  //re-add the newly osrted rows
  //not working for all rows
  tBody.append(...sortedRows)

  // remember how the column is currently sorted
  // helps with togleing back and forth
  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"))
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc)
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc)

  //Ended 17:30
}

//sortTableByColummn(document.querySelector(".player-listing"), 5)
