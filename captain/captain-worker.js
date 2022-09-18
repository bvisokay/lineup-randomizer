onmessage = function (e) {
  // define necesssary variables in worker scope
  let conditionsMet = false
  let i = 1
  let salaryMax = e.data.salaryMax
  let maxLineupsToCheck = e.data.maxLineupsToCheck
  let minimumPts = e.data.minimumPts
  let sitStarts = e.data.sitStarts
  let trimmedAndBenchedPlayerData = e.data.trimmedAndBenchedPlayerData
  let captPlayerPool = e.data.captPlayerPool
  let result
  let startTime = Date.now()

  /*
  console.log(`salaryMax: ${salaryMax}`)
  console.log(`maxLineupsToCheck: ${maxLineupsToCheck}`)
  console.log(`minimumPts: ${minimumPts}`)
  console.log(`sitStarts: ${sitStarts}`)
  console.log(
    `trimmedAndBenchedPlayerData: ${trimmedAndBenchedPlayerData
      .map(playerObj => {
        return playerObj.name
      })
      .join(", ")}`
  )
  console.log(
    `captPlayerPool: ${captPlayerPool
      .map(playerObj => {
        return playerObj.name
      })
      .join(", ")}`
  )
  */

  // run loop
  do {
    // create Random lineup, return it to the main thread if meets conditions
    // extra argument for captainPlayerPool
    result = createRandomLineup(salaryMax, minimumPts, sitStarts, trimmedAndBenchedPlayerData, captPlayerPool)

    // increment i to check again
    i++
  } while (i <= maxLineupsToCheck && conditionsMet == false)

  // end timer now that loop is finished
  let endTime = Date.now()
  let runTime = parseFloat(((endTime - startTime) / 1000).toFixed(3))
  //console.log(`runTime: ${runTime}`)

  // Define the createRandomLineup function
  function createRandomLineup(salaryMax, minimumPts, sitStartsArray, benchedPlayerData, captPlayerPool) {
    let captain = undefined
    let flex1 = undefined
    let flex2 = undefined
    let flex3 = undefined
    let flex4 = undefined
    let flex5 = undefined

    //all is well
    //console.log(`sitStartsArray Length:  ${sitStartsArray.length}`)
    //console.log(`benchedPlayerData Length:  ${benchedPlayerData.length}`)
    //console.log(benchedPlayerData.map(playerObj => playerObj.proj))
    //console.log(`captPlayerPool Length:  ${captPlayerPool.length}`)
    //console.log(captPlayerPool.map(playerObj => playerObj.proj))

    // set captain
    // set pos variables in advance to get out of if block
    if (!sitStartsArray[0]) {
      captain = captPlayerPool[Math.floor(Math.random() * captPlayerPool.length)]
    } else {
      captain = captPlayerPool.filter(x => x.name == sitStartsArray[0])[0]
    }
    //console.log(`captain: ${captain.name}`)

    // set flex1
    let flex1Pool = benchedPlayerData.filter(y => y.name !== captain.name)
    if (!sitStartsArray[1]) {
      flex1 = flex1Pool[Math.floor(Math.random() * flex1Pool.length)]
    } else {
      flex1 = benchedPlayerData.filter(x => x.name == sitStartsArray[1])[0]
    }
    //console.log(flex1Pool)
    //console.log(`flex1: ${flex1.name}`)

    // set flex2
    let flex2Pool = flex1Pool.filter(y => y.name !== flex1.name)
    if (!sitStartsArray[2]) {
      flex2 = flex2Pool[Math.floor(Math.random() * flex2Pool.length)]
    } else {
      flex2 = benchedPlayerData.filter(x => x.name == sitStartsArray[2])[0]
    }
    //console.log(flex2Pool)
    //console.log(`flex2: ${flex2.name}`)

    // set flex3
    let flex3Pool = flex2Pool.filter(y => y.name !== flex2.name)
    if (!sitStartsArray[3]) {
      flex3 = flex3Pool[Math.floor(Math.random() * flex3Pool.length)]
    } else {
      flex3 = benchedPlayerData.filter(x => x.name == sitStartsArray[3])[0]
    }
    //console.log(flex3Pool)
    //console.log(`flex3: ${flex3.name}`)

    // set flex4
    let flex4Pool = flex3Pool.filter(y => y.name !== flex3.name)
    if (!sitStartsArray[4]) {
      flex4 = flex4Pool[Math.floor(Math.random() * flex4Pool.length)]
    } else {
      flex4 = benchedPlayerData.filter(x => x.name == sitStartsArray[4])[0]
    }
    //console.log(flex4Pool)
    //console.log(`flex4: ${flex4.name}`)

    /*   function setPos(posToSet, posSitStartIndex, posBefore, posBeforePool, sitStartsArray) {
    let playerPool = posBeforePool.filter(y => y.name !== posBefore.name)

    if (!sitStartsArray[posSitStartIndex]) {
      posToSet = playerPool[Math.floor(Math.random() * playerPool.length)]
    } else {
      posToSet = benchedPlayerData.filter(x => x.name == sitStartsArray[posSitStartIndex])[0]
    }
    console.log(`posToSet: ${posToSet}`)
    console.log(`posToSetPool: ${playerPool}`)
    return posToSet
  }

  let flex5 = setPos("flex5", "5", flex4, flex4Pool, sitStartsArray) */

    // set flex5
    let flex5Pool = flex4Pool.filter(y => y.name !== flex4.name)
    if (!sitStartsArray[5]) {
      flex5 = flex5Pool[Math.floor(Math.random() * flex5Pool.length)]
    } else {
      flex5 = benchedPlayerData.filter(x => x.name == sitStartsArray[5])[0]
    }
    //console.log(flex5Pool)
    //console.log(`flex5: ${flex5.name}`)

    let testLineup = [captain, flex1, flex2, flex3, flex4, flex5]
    //console.log(testLineup)

    // define what gets returned if tests don't pass
    let failedDataObject = {
      conditionsMet,
      testLineup: null,
      testLineupSalary: null,
      testLineupProjectedPts: null
    }

    // define checkForDuplicates
    function checkTestForDuplicates(array) {
      let valuesAlreadySeen = []

      for (let i = 0; i < array.length; i++) {
        let value = array[i]
        if (valuesAlreadySeen.indexOf(value) !== -1) {
          return true
        }
        valuesAlreadySeen.push(value)
      }
      return false
    }
    let hasDuplicates = checkTestForDuplicates(testLineup)
    //console.log(hasDuplicates)
    // test if there ano duplicates (Test #1)
    if (hasDuplicates) {
      console.log("Duplicate Found in Test #1 for Lineup " + i)
      return
    }

    // calculate salary total
    let testLineupSalary = testLineup
      .map(player => player.salary)
      .reduce(function (a, b) {
        return a + b
      }, 0)

    // test if it passes the salary test (Test #2)
    if (testLineupSalary > salaryMax) {
      return failedDataObject
    }

    // calculate projPts total
    let testLineupProjectedPts = testLineup
      .map(player => player.proj)
      .reduce(function (a, b) {
        return a + b
      }, 0)

    // test if it passes the proj test (Test #3)
    if (testLineupProjectedPts < minimumPts) {
      return failedDataObject
    }

    function areAllTeamsEqual(testLineup) {
      let result = testLineup.every(playerObj => {
        return playerObj.team === testLineup[0].team
      })
      return result
    }
    let allPlayersOnSameTeam = areAllTeamsEqual(testLineup)
    //console.log(allPlayersOnSameTeam)
    // test if it passes the proj test (Test #4)
    if (allPlayersOnSameTeam) {
      return failedDataObject
    }

    // test all conditions redundantly
    // should never make it here and hit the else block
    if (testLineupProjectedPts >= minimumPts && testLineupSalary <= salaryMax && !allPlayersOnSameTeam && !hasDuplicates) {
      conditionsMet = true
      let passedDataObject = {
        conditionsMet,
        testLineup,
        testLineupSalary,
        testLineupProjectedPts
      }
      return passedDataObject
    } else {
      return failedDataObject
    }
  } // End createRandomLineup function definition

  // define data object to send back from worker
  let outputObject = {
    conditionsMet: result.conditionsMet,
    testLineup: result.testLineup,
    i: i - 1,
    runTime,
    testLineupSalary: result.testLineupSalary,
    testLineupProjectedPts: result.testLineupProjectedPts
  }

  // send data back from worker to end worker
  postMessage(outputObject)
}
