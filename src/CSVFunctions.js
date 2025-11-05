const formatConversion = {
  'basketball_nba': {
    'stats': {
      'player_points_alternate': 'Points',
      'player_points': 'Points',
      'player_rebounds': 'Rebounds',
      'player_assists': 'Assists',
      'player_threes': 'Three Pointers',
      'player_blocks': 'Blocks',
      'player_steals': 'Steals',
      'player_turnovers': 'Turnovers',
      'player_pass_tds': 'Touchdown Pass'
    },
    'players': {
      'A.J. Green':'AJ Green',
      'Alex Sarr':'Alexandre Sarr',
      'Alperen Sengun':'Alperen Sengün',
      'Andre Jackson Jr':'Andre Jackson Jr.',
      'B.J. Boston Jr':'Brandon Boston Jr.',
      'Bruce Brown Jr':'Bruce Brown',	
      'C.J. McCollum':'CJ McCollum',
      'Derrick Jones':'Derrick Jones Jr.',
      'Gary Trent Jr':'Gary Trent Jr.',
      'G.G. Jackson':'Gregory Jackson',
      'Herb Jones':'Herbert Jones',
      'Isaiah Stewart II':'Isaiah Stewart',
      'Jabari Smith Jr':'Jabari Smith Jr.',
      'Jaime Jaquez Jr':'Jaime Jaquez Jr.',
      'Jaren Jackson Jr':'Jaren Jackson Jr.',
      'K.J. Martin':'KJ Martin',
      'Kelly Oubre Jr':'Kelly Oubre Jr.',
      'Larry Nance Jr':'Larry Nance Jr.',
      'Michael Porter Jr':'Michael Porter Jr.',
      'Moe Wagner':'Moritz Wagner',
      'Nick Smith Jr':'Nick Smith Jr.',
      'Nicolas Claxton':'Nic Claxton',
      'P.J. Washington':'PJ Washington',
      'R.J. Barrett':'RJ Barrett',
      'Ron Holland':'Ronald Holland II',	
      'Scotty Pippen Jr':'Scotty Pippen Jr.',
      'Tim Hardaway Jr':'Tim Hardaway Jr.',
      'Wendell Carter Jr':'Wendell Carter Jr.',
    }
  },
  'americanfootball_nfl': {
    'stats': {
      'player_pass_attempts':'Attempts',
      'player_pass_attempts_alternate':'Attempts',
      'player_pass_completions':'Completions',
      'player_pass_completions_alternate':'Completions',
      'player_pass_interceptions':'Pass INTs',
      'player_pass_interceptions_alternate':'Pass INTs',
      'player_pass_tds':'Pass TDs',
      'player_pass_tds_alternate':'Pass TDs',
      'player_pass_yds':'Pass Yards',
      'player_pass_yds_alternate':'Pass Yards',
      'player_receptions':'Receptions',
      'player_receptions_alternate':'Receptions',
      'player_reception_tds':'Receiving TDs',
      'player_reception_tds_alternate':'Receiving TDs',
      'player_reception_yds':'Receiving Yards',
      'player_reception_yds_alternate':'Receiving Yards',
      'player_rush_tds':'Rush TDs',
      'player_rush_tds_alternate':'Rush TDs',
      'player_rush_yds':'Rush Yards',
      'player_rush_yds_alternate':'Rush Yards',
      'player_rush_attempts':'Carries',
      'player_rush_attempts_alternate':'Carries',
    },
    'players': {
      'Amon-Ra St. Brown':'Amon-Ra St Brown',
      'Travis Etienne Jr.':'Travis Etienne',
      'Brian Thomas Jr':'Brian Thomas',
      'Tyrone Tracy Jr.':'Tyrone Tracy',
      'Michael Penix Jr.':'Michael Penix',
      'Harold Fannin Jr.':'Harold Fannin',
      'Oronde Gadsden II':'Oronde Gadsden',
      "Tre Harris":"Tre' Harris",
      'Ray-Ray McCloud III':'Ray-Ray McCloud',
      'Deebo Samuel Sr.':'Deebo Samuel',
      'Chris Rodriguez Jr.':'Chris Rodriguez',
      'C.J. Stroud':'CJ Stroud',
      'Cam Ward':'Cameron Ward',
      'Chigoziem Okonkwo':'Chig Okonkwo',
      'Michael Pittman Jr.':'Michael Pittman',
      'Brian Robinson Jr.':'Brian Robinson',
      "Dont'e Thornton Jr.":"Dont'e Thornton",
      'Luther Burden III':'Luther Burden',
      'T.J. Hockenson':'TJ Hockenson',
      'Calvin Austin III':'Calvin Austin',
      'Kenneth Walker III':'Kenneth Walker',
      'J.K. Dobbins':'JK Dobbins',
      'J.J. McCarthy':'JJ McCarthy',
      'Zonovan Knight':'Bam Knight',
      'Marvin Harrison Jr.':'Marvin Harrison',
    }
  }
}

function translate(myText, category, sport) {
  let yourText
  yourText = formatConversion[sport][category][myText] ? formatConversion[sport][category][myText] : myText
  return yourText
}

const deconstructEventObj = (eventObj, sport) => {
  let resultStr = ''
  eventObj.bookmakers.forEach((bm) => {
    bm.markets.forEach((market) => {
      market.outcomes.forEach((outcome) => {
        let outcomeArr = []
        Object.keys(outcome).map((i) => {
          const newValue = i === 'description' ? 
          translate(outcome[i], 'players', sport) + `,${eventObj.away_team} @ ${eventObj.home_team}` : 
          outcome[i]
          outcomeArr.push(newValue)
        })
        resultStr = resultStr + `${bm.title},` + `${translate(market.key, 'stats', sport)},` + outcomeArr.join(',') + (market.key.includes('alternate') ? ',alt' : ',standard') + '\n'
      })
    })
  })
  return resultStr

}

export {
  deconstructEventObj as deconstructCSV
}