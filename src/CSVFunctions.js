const statConversion = {
  'player_points': 'Points',
  'player_rebounds': 'Rebounds',
  'player_assists': 'Assists',
  'player_threes': 'ThreePt',
  'player_blocks': 'Blocks',
  'player_steals': 'Steals',
  'player_turnovers': 'Turnovers',
  'player_pass_tds': 'Touchdown Pass'
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
        resultStr = resultStr + `${bm.title},` + `${statConversion[market.key]},` + outcomeArr.join(',') + '\n'
      })
    })
  })
  return resultStr

}

export {
  deconstructEventObj as deconstructCSV
}