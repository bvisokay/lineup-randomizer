let latePlayerData = [
  { name: "	San Francisco 49ers	", pos: "	DST	", salary: 3900, team: "	SF	", ppg: 5, proj: 8.3, cpp: 469.9 },
  { name: "	Los Angeles Rams	", pos: "	DST	", salary: 4000, team: "	LAR	", ppg: 9, proj: 8.1, cpp: 493.8 },
  { name: "	Cincinnati Bengals	", pos: "	DST	", salary: 2200, team: "	CIN	", ppg: 2, proj: 7.7, cpp: 285.7 },
  { name: "	Denver Broncos	", pos: "	DST	", salary: 3800, team: "	DEN	", ppg: 5, proj: 7.6, cpp: 500.0 },
  { name: "	Dallas Cowboys	", pos: "	DST	", salary: 3000, team: "	DAL	", ppg: 5, proj: 6.9, cpp: 434.8 },
  { name: "	Arizona Cardinals	", pos: "	DST	", salary: 2400, team: "	ARI	", ppg: -2, proj: 6.3, cpp: 381.0 },
  { name: "	Las Vegas Raiders	", pos: "	DST	", salary: 3100, team: "	LV	", ppg: 0, proj: 5.9, cpp: 525.4 },
  { name: "	Houston Texans	", pos: "	DST	", salary: 2100, team: "	HOU	", ppg: 7, proj: 5.6, cpp: 375.0 },
  { name: "	Atlanta Falcons	", pos: "	DST	", salary: 2100, team: "	ATL	", ppg: 6, proj: 5.5, cpp: 381.8 },
  { name: "	Seattle Seahawks	", pos: "	DST	", salary: 2500, team: "	SEA	", ppg: 7, proj: 5.4, cpp: 463.0 },
  { name: "	Kyler Murray	", pos: "	QB	", salary: 7500, team: "	ARI	", ppg: 20.62, proj: 20.7, cpp: 362.3 },
  { name: "	Trey Lance	", pos: "	QB	", salary: 5700, team: "	SF	", ppg: 10.96, proj: 20.5, cpp: 278.0 },
  { name: "	Russell Wilson	", pos: "	QB	", salary: 7200, team: "	DEN	", ppg: 20.8, proj: 20.4, cpp: 352.9 },
  { name: "	Matthew Stafford	", pos: "	QB	", salary: 6300, team: "	LAR	", ppg: 10.8, proj: 20.2, cpp: 311.9 },
  { name: "	Derek Carr	", pos: "	QB	", salary: 6200, team: "	LV	", ppg: 16.8, proj: 19.8, cpp: 313.1 },
  { name: "	Joe Burrow	", pos: "	QB	", salary: 6600, team: "	CIN	", ppg: 26.22, proj: 18.6, cpp: 354.8 },
  { name: "	Marcus Mariota	", pos: "	QB	", salary: 5600, team: "	ATL	", ppg: 20.8, proj: 16.5, cpp: 339.4 },
  { name: "	Davis Mills	", pos: "	QB	", salary: 5200, team: "	HOU	", ppg: 16.5, proj: 14.7, cpp: 353.7 },
  { name: "	Cooper Rush	", pos: "	QB	", salary: 5000, team: "	DAL	", ppg: 2.56, proj: 14.7, cpp: 340.1 },
  { name: "	Geno Smith	", pos: "	QB	", salary: 5100, team: "	SEA	", ppg: 17.2, proj: 13.2, cpp: 386.4 },
  { name: "	Javonte Williams	", pos: "	RB	", salary: 6500, team: "	DEN	", ppg: 20.8, proj: 18.5, cpp: 351.4 },
  { name: "	Joe Mixon	", pos: "	RB	", salary: 7200, team: "	CIN	", ppg: 21.5, proj: 18.3, cpp: 393.4 },
  { name: "	James Conner	", pos: "	RB	", salary: 6900, team: "	ARI	", ppg: 16.5, proj: 17.2, cpp: 401.2 },
  { name: "	Darrell Henderson Jr.	", pos: "	RB	", salary: 5700, team: "	LAR	", ppg: 12.3, proj: 15.6, cpp: 365.4 },
  { name: "	Josh Jacobs	", pos: "	RB	", salary: 5800, team: "	LV	", ppg: 8.3, proj: 14.7, cpp: 394.6 },
  { name: "	Cordarrelle Patterson	", pos: "	RB	", salary: 6000, team: "	ATL	", ppg: 25.6, proj: 14.6, cpp: 411.0 },
  { name: "	Ezekiel Elliott	", pos: "	RB	", salary: 5900, team: "	DAL	", ppg: 5.9, proj: 13.3, cpp: 443.6 },
  { name: "	Rashaad Penny	", pos: "	RB	", salary: 5400, team: "	SEA	", ppg: 8.7, proj: 11.8, cpp: 457.6 },
  { name: "	Jeff Wilson Jr.	", pos: "	RB	", salary: 5100, team: "	SF	", ppg: 5, proj: 11.5, cpp: 443.5 },
  { name: "	Rex Burkhead	", pos: "	RB	", salary: 4900, team: "	HOU	", ppg: 12, proj: 10.7, cpp: 457.9 },
  { name: "	Melvin Gordon III	", pos: "	RB	", salary: 6100, team: "	DEN	", ppg: 8.2, proj: 10, cpp: 610.0 },
  { name: "	Tony Pollard	", pos: "	RB	", salary: 5800, team: "	DAL	", ppg: 4.2, proj: 10, cpp: 580.0 },
  { name: "	Dameon Pierce	", pos: "	RB	", salary: 4700, team: "	HOU	", ppg: 4.9, proj: 9.2, cpp: 510.9 },
  { name: "	Brandon Bolden	", pos: "	RB	", salary: 4400, team: "	LV	", ppg: 10.8, proj: 9, cpp: 488.9 },
  { name: "	Cam Akers	", pos: "	RB	", salary: 5600, team: "	LAR	", ppg: 0, proj: 6.9, cpp: 811.6 },
  { name: "	Ameer Abdullah	", pos: "	RB	", salary: 4000, team: "	LV	", ppg: 0, proj: 6, cpp: 666.7 },
  { name: "	Eno Benjamin	", pos: "	RB	", salary: 4200, team: "	ARI	", ppg: 9.1, proj: 4.7, cpp: 893.6 },
  { name: "	Darren Waller	", pos: "	TE	", salary: 5600, team: "	LV	", ppg: 11.9, proj: 13.7, cpp: 408.8 },
  { name: "	Dalton Schultz	", pos: "	TE	", salary: 5200, team: "	DAL	", ppg: 13.2, proj: 12.2, cpp: 426.2 },
  { name: "	Kyle Pitts	", pos: "	TE	", salary: 5400, team: "	ATL	", ppg: 3.9, proj: 11.7, cpp: 461.5 },
  { name: "	Zach Ertz	", pos: "	TE	", salary: 4500, team: "	ARI	", ppg: 11.4, proj: 11.4, cpp: 394.7 },
  { name: "	Tyler Higbee	", pos: "	TE	", salary: 4200, team: "	LAR	", ppg: 8.9, proj: 10.3, cpp: 407.8 },
  { name: "	Albert Okwuegbunam	", pos: "	TE	", salary: 3700, team: "	DEN	", ppg: 8.3, proj: 9.1, cpp: 406.6 },
  { name: "	Hayden Hurst	", pos: "	TE	", salary: 3600, team: "	CIN	", ppg: 9.6, proj: 7.3, cpp: 493.2 },
  { name: "	Noah Fant	", pos: "	TE	", salary: 4000, team: "	SEA	", ppg: 4.6, proj: 7.1, cpp: 563.4 },
  { name: "	Brevin Jordan	", pos: "	TE	", salary: 2600, team: "	HOU	", ppg: 1.5, proj: 5.4, cpp: 481.5 },
  { name: "	Cooper Kupp	", pos: "	WR	", salary: 9900, team: "	LAR	", ppg: 34.8, proj: 23.9, cpp: 414.2 },
  { name: "	Davante Adams	", pos: "	WR	", salary: 8600, team: "	LV	", ppg: 33.1, proj: 21.7, cpp: 396.3 },
  { name: "	Ja'Marr Chase	", pos: "	WR	", salary: 8000, team: "	CIN	", ppg: 31.9, proj: 18.9, cpp: 423.3 },
  { name: "	Deebo Samuel	", pos: "	WR	", salary: 7800, team: "	SF	", ppg: 13.6, proj: 17.8, cpp: 438.2 },
  { name: "	Brandin Cooks	", pos: "	WR	", salary: 6000, team: "	HOU	", ppg: 15.2, proj: 16, cpp: 375.0 },
  { name: "	Marquise Brown	", pos: "	WR	", salary: 6200, team: "	ARI	", ppg: 14.3, proj: 15.6, cpp: 397.4 },
  { name: "	Courtland Sutton	", pos: "	WR	", salary: 6100, team: "	DEN	", ppg: 11.2, proj: 15, cpp: 406.7 },
  { name: "	CeeDee Lamb	", pos: "	WR	", salary: 6900, team: "	DAL	", ppg: 4.9, proj: 14.8, cpp: 466.2 },
  { name: "	Tee Higgins	", pos: "	WR	", salary: 5900, team: "	CIN	", ppg: 4.7, proj: 14.1, cpp: 418.4 },
  { name: "	DK Metcalf	", pos: "	WR	", salary: 6300, team: "	SEA	", ppg: 9.6, proj: 13.8, cpp: 456.5 },
  { name: "	Jerry Jeudy	", pos: "	WR	", salary: 5600, team: "	DEN	", ppg: 23.2, proj: 13.8, cpp: 405.8 },
  { name: "	Allen Robinson II	", pos: "	WR	", salary: 5500, team: "	LAR	", ppg: 2.2, proj: 13.1, cpp: 419.8 },
  { name: "	Hunter Renfrow	", pos: "	WR	", salary: 5500, team: "	LV	", ppg: 5.1, proj: 12.5, cpp: 440.0 },
  { name: "	Tyler Lockett	", pos: "	WR	", salary: 5600, team: "	SEA	", ppg: 5.8, proj: 11.9, cpp: 470.6 },
  { name: "	Drake London	", pos: "	WR	", salary: 5200, team: "	ATL	", ppg: 12.4, proj: 11.5, cpp: 452.2 },
  { name: "	Brandon Aiyuk	", pos: "	WR	", salary: 5100, team: "	SF	", ppg: 6.7, proj: 11.4, cpp: 447.4 },
  { name: "	Greg Dortch	", pos: "	WR	", salary: 3500, team: "	ARI	", ppg: 13.3, proj: 9.7, cpp: 360.8 },
  { name: "	Nico Collins	", pos: "	WR	", salary: 4100, team: "	HOU	", ppg: 4.6, proj: 9.3, cpp: 440.9 },
  { name: "	Tyler Boyd	", pos: "	WR	", salary: 5400, team: "	CIN	", ppg: 13.3, proj: 9.1, cpp: 593.4 },
  { name: "	A.J. Green	", pos: "	WR	", salary: 4300, team: "	ARI	", ppg: 3.3, proj: 7.9, cpp: 544.3 },
  { name: "	Noah Brown	", pos: "	WR	", salary: 3800, team: "	DAL	", ppg: 11.8, proj: 7.3, cpp: 520.5 },
  { name: "	Ben Skowronek	", pos: "	WR	", salary: 3300, team: "	LAR	", ppg: 6.5, proj: 6.8, cpp: 485.3 },
  { name: "	Jauan Jennings	", pos: "	WR	", salary: 3400, team: "	SF	", ppg: 10.2, proj: 6.5, cpp: 523.1 },
  { name: "	Olamide Zaccheaus	", pos: "	WR	", salary: 4200, team: "	ATL	", ppg: 7.9, proj: 6.2, cpp: 677.4 },
  { name: "	Dennis Houston	", pos: "	WR	", salary: 3000, team: "	DAL	", ppg: 3.6, proj: 5.8, cpp: 517.2 },
  { name: "	Bryan Edwards	", pos: "	WR	", salary: 3900, team: "	ATL	", ppg: 0, proj: 5.4, cpp: 722.2 },
  { name: "	Tyler Johnson	", pos: "	WR	", salary: 3200, team: "	HOU	", ppg: 0, proj: 5.3, cpp: 603.8 },
  { name: "	Mack Hollins	", pos: "	WR	", salary: 3100, team: "	LV	", ppg: 2.6, proj: 5.2, cpp: 596.2 },
  { name: "	Chris Moore	", pos: "	WR	", salary: 3100, team: "	HOU	", ppg: 6.1, proj: 4.1, cpp: 756.1 }
]