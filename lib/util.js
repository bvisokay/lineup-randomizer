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
