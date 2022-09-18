onmessage = function (e) {
  // define necesssary variables in the worker's scope
  let conditionsMet = false
  let i = 1
  let salaryMax = e.data.salaryMax
  let maxLineupsToCheck = e.data.maxLineupsToCheck
  let minimumPts = e.data.minimumPts
  let sitStarts = e.data.sitStarts
  let trimmedAndBenchedPlayerData = e.data.trimmedAndBenchedPlayerData
  let result
  let startTime = Date.now()

  // test variables
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
  */

  // run loop
  do {
    // create random lineup, return it to the main thread it meets all conditions
    result = createRandomLineup(salaryMax, minimumPts, sitStarts, trimmedAndBenchedPlayerData)
    // increment i to check again
    i++
  } while (i <= maxLineupsToCheck && conditionsMet == false)

  // end timer now that loop is finished
  let endTime = Date.now()
  let runTime = parseFloat(((endTime - startTime) / 1000).toFixed(3))
  //console.log(`runTime: ${runTime}`)

  function createRandomLineup(salaryMax, minimumPts, sitStartsArray, trimmedPlayerData) {
    // set quarterback
    // set pos variables in advance to get out of if block
    let qb
    let qbPlayerPool = trimmedPlayerData.filter(x => x.pos == "QB")
    qb = qbPlayerPool[Math.floor(Math.random() * qbPlayerPool.length)]

    // set rb1
    let rb1
    if (!sitStartsArray[1]) {
      let rb1PlayerPool = trimmedPlayerData.filter(x => x.pos == "RB")
      rb1 = rb1PlayerPool[Math.floor(Math.random() * rb1PlayerPool.length)]
    } else {
      rb1 = trimmedPlayerData.filter(x => x.name == sitStartsArray[1])[0]
    }

    let rb2PlayerPool = trimmedPlayerData.filter(x => x.pos == "RB").filter(y => y.name != rb1.name)
    let rb2 = rb2PlayerPool[Math.floor(Math.random() * rb2PlayerPool.length)]

    // set wr1
    let wr1
    if (!sitStartsArray[2]) {
      let wr1PlayerPool = trimmedPlayerData.filter(x => x.pos == "WR")
      wr1 = wr1PlayerPool[Math.floor(Math.random() * wr1PlayerPool.length)]
    } else {
      wr1 = trimmedPlayerData.filter(x => x.name == sitStartsArray[2])[0]
    }

    // set wr2
    let wr2PlayerPool = trimmedPlayerData.filter(x => x.pos == "WR").filter(y => y.name != wr1.name)
    let wr2 = wr2PlayerPool[Math.floor(Math.random() * wr2PlayerPool.length)]

    // set wr3
    let wr3PlayerPool = wr2PlayerPool.filter(y => y.name != wr1.name && y.name != wr2.name)
    let wr3 = wr3PlayerPool[Math.floor(Math.random() * wr3PlayerPool.length)]

    // set te
    let te
    if (!sitStartsArray[3]) {
      let tePlayerPool = trimmedPlayerData.filter(x => x.pos == "TE")
      te = tePlayerPool[Math.floor(Math.random() * tePlayerPool.length)]
    } else {
      te = trimmedPlayerData.filter(x => x.name == sitStartsArray[3])[0]
    }

    // set flex
    let flexPlayerPool = trimmedPlayerData.filter(x => x.pos == "RB" || x.pos == "WR" || x.pos == "TE").filter(y => y.name != rb1.name && y.name != rb2.name && y.name != wr1.name && y.name != wr2.name && y.name != wr3.name && y.name != te.name)
    let flex = flexPlayerPool[Math.floor(Math.random() * flexPlayerPool.length)]

    // set dst
    let dst
    let dstPlayerPool = trimmedPlayerData.filter(x => x.pos == "DST")
    dst = dstPlayerPool[Math.floor(Math.random() * dstPlayerPool.length)]

    // define lineup as array
    let testLineup = [qb, rb1, rb2, wr1, wr2, wr3, te, flex, dst]

    // define what gets returned if tests don't pass
    let failedDataObject = {
      conditionsMet,
      testLineup: null,
      testLineupSalary: null,
      testLineupProjectedPts: null
    }

    // calculate salary total
    let testLineupSalary = testLineup
      .map(player => player.salary)
      .reduce(function (a, b) {
        return a + b
      }, 0)

    // test if it passes the salary test (Test #1)
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

    //console.log("Lineup " + i + " Players: " + testLineup.map(player => player.name.trim()).join(", "))
    //console.log(testLineupSalary)
    //console.log(testLineupProjectedPts)

    // test both conditions redundantly
    // should never make it here and then hit the else block
    if (testLineupProjectedPts >= minimumPts && testLineupSalary <= salaryMax) {
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

  // send data back from worker and the worker ends
  postMessage(outputObject)
}
