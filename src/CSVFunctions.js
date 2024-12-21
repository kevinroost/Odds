const statConversion = {
  'player_points_alternate': 'Points',
  'player_points': 'Points',
  'player_rebounds': 'Rebounds',
  'player_assists': 'Assists',
  'player_threes': 'Threes',
  'player_blocks': 'Blocks',
  'player_steals': 'Steals',
  'player_turnovers': 'Turnovers',
  'player_pass_tds': 'Touchdown Pass'
}

function translate(myStat) {
  const yourStat = statConversion[myStat] ? statConversion[myStat] : myStat
  return yourStat
}

const deconstructEventObj = (eventObj) => {
  let resultStr = ''
  eventObj.bookmakers.forEach((bm) => {
    bm.markets.forEach((market) => {
      market.outcomes.forEach((outcome) => {
        let outcomeArr = []
        Object.keys(outcome).map((i) => {
          const newValue = i === 'description' ? outcome[i].replace('Jr', 'Jr.') : outcome[i]
          outcomeArr.push(newValue)
        })
        resultStr = resultStr + `${eventObj.away_team} @ ${eventObj.home_team},` + `${bm.title},` + `${translate(market.key)},` + outcomeArr.join(',') + (market.key === 'player_points_alternate' ? ',alt' : ',standard') + '\n'
      })
    })
  })
  return resultStr

}

export {
  deconstructEventObj as deconstructCSV
}