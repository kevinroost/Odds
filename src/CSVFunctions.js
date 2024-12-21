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
          outcomeArr.push(outcome[i])
        })
        resultStr = resultStr + `${bm.title},` + `${translate(market.key)},` + outcomeArr.join(',') + (market.key === 'player_points_alternate' ? ',alt' : ',now') + '\n'
      })
    })
  })
  return resultStr

}

export {
  deconstructEventObj as deconstructCSV
}