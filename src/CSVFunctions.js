const formatConversion = {
  stats: {
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
  players: {
    'A.J. Green':'AJ Green',
    'Alex Sarr':'Alexandre Sarr',
    'Andre Jackson Jr':'Andre Jackson Jr.',
    'B.J. Boston Jr':'Brandon Boston Jr.',
    'C.J. McCollum':'CJ McCollum',
    'Derrick Jones':'Derrick Jones Jr.',
    'Herb Jones':'Herbert Jones',
    'Jaime Jaquez Jr':'Jaime Jaquez Jr.',
    'Jaren Jackson Jr':'Jaren Jackson Jr.',
    'K.J. Martin':'KJ Martin',
    'Kelly Oubre Jr':'Kelly Oubre Jr.',
    'Moe Wagner':'Moritz Wagner',
    'Nicolas Claxton':'Nic Claxton',
    'P.J. Washington':'PJ Washington',
    'Scotty Pippen Jr':'Scotty Pippen Jr.',
    'Tim Hardaway Jr':'Tim Hardaway Jr.',
    'Wendell Carter Jr':'Wendell Carter Jr.',
    'Michael Porter Jr':'Michael Porter Jr.',
    'Jabari Smith Jr':'Jabari Smith Jr.',
  }
}

function translate(myText, category) {
  let yourText
  if (category === 'stat') {
    yourText = formatConversion.stats[myText] ? formatConversion.stats[myText] : myText
  } else if (category === 'player') {
    yourText = formatConversion.players[myText] ? formatConversion.players[myText] : myText
  }
  return yourText
}

const deconstructEventObj = (eventObj) => {
  let resultStr = ''
  eventObj.bookmakers.forEach((bm) => {
    bm.markets.forEach((market) => {
      market.outcomes.forEach((outcome) => {
        let outcomeArr = []
        Object.keys(outcome).map((i) => {
          const newValue = i === 'description' ? 
            translate(outcome[i], 'player') + `,${eventObj.away_team} @ ${eventObj.home_team}` : 
            outcome[i]
          outcomeArr.push(newValue)
        })
        resultStr = resultStr + `${bm.title},` + `${translate(market.key, 'stat')},` + outcomeArr.join(',') + (market.key === 'player_points_alternate' ? ',alt' : ',standard') + '\n'
      })
    })
  })
  console.log(resultStr);
  return resultStr

}

export {
  deconstructEventObj as deconstructCSV
}