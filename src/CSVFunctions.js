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
    'Vit Krejci':'Vít Krejčí',
    'Wendell Carter Jr':'Wendell Carter Jr.',
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
  return resultStr

}

export {
  deconstructEventObj as deconstructCSV
}