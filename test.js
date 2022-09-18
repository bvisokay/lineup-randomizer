/*
 *
 * This is a test:
 * filtering a playerData array to only show a started player at that position if one exists.
 * Mostly just for QB, TE, and DST for now
 *
 */

/* The goal of the test is to make the existing loop more efficient */

/* The loop calls the createRandomLineup function until it meets the conditions or the max is reached */

/* So looking at refactoring the createRandomLineup function */

/* Here is the current stat eof setting the QB position. Notice it checks the sitStarts array for a value and, if there is one, uses that, else runs the random function. */

let qb
if (!sitStartsArray[0]) {
  let qbPlayerPool = trimmedPlayerData.filter(x => x.pos == "QB")
  qb = qbPlayerPool[Math.floor(Math.random() * qbPlayerPool.length)]
} else {
  qb = trimmedPlayerData.filter(x => x.name == sitStartsArray[0])[0]
}

/* By filtering the playerData array in advance for handling starts, that check becomes unnecessary and can be removed leaving just the create QB Pool and select random procedure to run. The select random will be run even though there is only one value, but this is more efficient than it was. */

/* let qb
      let qbPlayerPool = trimmedPlayerData.filter(x => x.pos == "QB")
      qb = qbPlayerPool[Math.floor(Math.random() * qbPlayerPool.length)] */

/* And Done */

/* For the all sunday slate, Week11, by setting a QB, TE, and DST start the players array sent to the loop went from 209 to 135 */

/* REALIZED CANNOT DO THIS FOR TE POSITION AS THEY ARE NEEDED FOR FLEX POOL! */

/* For the all sunday slate, Week11, by setting a QB and DST start the players array sent to the loop went from 209 to 160 */

/* Running a test of new changes versus previous: made no noticeable difference. Even with changes in the combined conditional checks. The time is related to the number of items in the array, (trim and filters take longer). */

let trimmedAndBenchedPlayerData = [
  { name: "	New England Patriots	", pos: "	DST	", salary: 5600, team: "	NE	", ppg: 9.3, proj: 5.9, cpp: 949.2 },
  { name: "	Atlanta Falcons	", pos: "	DST	", salary: 3400, team: "	ATL	", ppg: 2.33, proj: 5.3, cpp: 641.5 },
  { name: "	Nick Folk	", pos: "	K	", salary: 4400, team: "	NE	", ppg: 10.3, proj: 8.2, cpp: 536.6 },
  { name: "	Younghoe Koo	", pos: "	K	", salary: 4000, team: "	ATL	", ppg: 7.56, proj: 7.5, cpp: 533.3 },
  { name: "	Mac Jones	", pos: "	QB	", salary: 10600, team: "	NE	", ppg: 14.92, proj: 17.6, cpp: 602.3 },
  { name: "	Matt Ryan	", pos: "	QB	", salary: 10800, team: "	ATL	", ppg: 18.3, proj: 16.5, cpp: 654.5 },
  { name: "	Cordarrelle Patterson	", pos: "	RB	", salary: 10200, team: "	ATL	", ppg: 17.96, proj: 13, cpp: 784.6 },
  { name: "	Mike Davis	", pos: "	RB	", salary: 5800, team: "	ATL	", ppg: 8.38, proj: 10.9, cpp: 532.1 },
  { name: "	Damien Harris	", pos: "	RB	", salary: 8800, team: "	NE	", ppg: 13.44, proj: 9.8, cpp: 898.0 },
  { name: "	Rhamondre Stevenson	", pos: "	RB	", salary: 8600, team: "	NE	", ppg: 10.95, proj: 9.8, cpp: 877.6 },
  { name: "	Brandon Bolden	", pos: "	RB	", salary: 4800, team: "	NE	", ppg: 6.77, proj: 8.4, cpp: 571.4 },
  { name: "	Wayne Gallman Jr.	", pos: "	RB	", salary: 8400, team: "	ATL	", ppg: 2.98, proj: 6.4, cpp: 1312.5 },
  { name: "	J.J. Taylor	", pos: "	RB	", salary: 1000, team: "	NE	", ppg: 3.9, proj: 4, cpp: 250.0 },
  { name: "	Kyle Pitts	", pos: "	TE	", salary: 9600, team: "	ATL	", ppg: 12.51, proj: 13.7, cpp: 700.7 },
  { name: "	Hunter Henry	", pos: "	TE	", salary: 7000, team: "	NE	", ppg: 10.83, proj: 8.2, cpp: 853.7 },
  { name: "	Hayden Hurst	", pos: "	TE	", salary: 1800, team: "	ATL	", ppg: 4.53, proj: 6, cpp: 300.0 },
  { name: "	Jonnu Smith	", pos: "	TE	", salary: 2400, team: "	NE	", ppg: 5.37, proj: 5.6, cpp: 428.6 },
  { name: "	Jakobi Meyers	", pos: "	WR	", salary: 8000, team: "	NE	", ppg: 11.01, proj: 12.3, cpp: 650.4 },
  { name: "	Kendrick Bourne	", pos: "	WR	", salary: 7600, team: "	NE	", ppg: 11.41, proj: 10.3, cpp: 737.9 },
  { name: "	Russell Gage	", pos: "	WR	", salary: 6600, team: "	ATL	", ppg: 6.32, proj: 9.8, cpp: 673.5 },
  { name: "	Nelson Agholor	", pos: "	WR	", salary: 5000, team: "	NE	", ppg: 7.21, proj: 9.4, cpp: 531.9 },
  { name: "	Olamide Zaccheaus	", pos: "	WR	", salary: 5400, team: "	ATL	", ppg: 5.82, proj: 7.3, cpp: 739.7 },
  { name: "	Tajae Sharpe	", pos: "	WR	", salary: 3600, team: "	ATL	", ppg: 3.78, proj: 6.6, cpp: 545.5 }
]

trimmedAndBenchedPlayerData = trimmedAndBenchedPlayerData.map(playerObj => {
  return (playerObj = {
    name: playerObj.name.trim(),
    pos: playerObj.pos.trim(),
    salary: playerObj.salary,
    team: playerObj.team.trim(),
    ppg: playerObj.ppg,
    proj: playerObj.proj,
    cpp: playerObj.cpp
  })
})

//console.log(trimmedAndBenchedPlayerData)

sitStarts = ["Matt Ryan", "", "", "Hunter Henry", "New England Patriots"]

// If QB is started remove other QBs
if (sitStarts[0] !== "") {
  trimmedAndBenchedPlayerData = trimmedAndBenchedPlayerData.filter(playerObj => {
    return playerObj.name === sitStarts[0] || playerObj.pos === "RB" || playerObj.pos === "WR" || playerObj.pos === "TE" || playerObj.pos === "FLEX" || playerObj.pos === "DST"
  })
}

console.log(trimmedAndBenchedPlayerData.map(player => player.name))

// If TE is started remove other TEs
if (sitStarts[3] !== "") {
  trimmedAndBenchedPlayerData = trimmedAndBenchedPlayerData.filter(playerObj => {
    return playerObj.pos === "QB" || playerObj.pos === "RB" || playerObj.pos === "WR" || playerObj.name === sitStarts[3] || playerObj.pos === "FLEX" || playerObj.pos === "DST"
  })
}

//console.log(trimmedAndBenchedPlayerData)

// If DST is started remove other

DSTs
if (sitStarts[4] !== "") {
  trimmedAndBenchedPlayerData = trimmedAndBenchedPlayerData.filter(playerObj => {
    return playerObj.pos === "QB" || playerObj.pos === "RB" || playerObj.pos === "WR" || playerObj.pos === "TE" || playerObj.pos === "FLEX" || playerObj.name === sitStarts[4]
  })
}
//console.log(trimmedAndBenchedPlayerData.map(player => player.name))
