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

// Add bench select options
function addBenchSelectOptions(selectVariable) {
  selectVariable.innerHTML = `
  <option value="">Select</option>
  ${trimmedPlayerData.map(player => {
    return `<option value="${player.name}">${player.name}</option>`
  })}
  `
}

function goTop() {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Others
}
