
const BASE_URL = `https://api.the-odds-api.com/v4`
//kevin's key
// const apiKey = `500f166477bfa898975d028eb619e455`
//mitchell's key
// const apiKey = `b4011b9749b9ea5a7b0d9efd49f3411c`
//havoc's key
// const apiKey = `0d4bdd3400ac289023c53778646df18e`
//jake's key
// const apiKey = '1f6657e3afe6ab20d188a25cf5ac2705'
//derek's key
const apiKey = 'aca95eb6712f2d9f14266215b3daaac6'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));




async function getSports() {
  try {
    const res = await fetch(`${BASE_URL}/sports?apiKey=${apiKey}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await res.json()
    if (json.err) throw new Error(json.err)
    return json
  } catch (err) {
    throw new Error(err)
  }
}
async function getEvents(today) {
  var end = new Date();
  end.setHours(23,59,59);
  //&commenceTimeTo=${end.toISOString().slice(0, -5)+'Z'}
  const commencementFilter = today?`&commenceTimeTo=${end.toISOString().slice(0, -5)+'Z'}`:``
  try {
    const res = await fetch(`${BASE_URL}/sports/basketball_nba/events?apiKey=${apiKey}` + `${commencementFilter}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await res.json()
    console.log(json);
    if (json.err) throw new Error(json.err)
      return json
  } catch (err) {
    throw new Error(err)
  }
}

async function getPlayerProps(eventIdArr, markets, bms, includeAlts) {
  try {
    const resArr = []
    for (let i = 0; i < eventIdArr.length; i++) {
      await delay(2000)
      const res = await fetch(`${BASE_URL}/sports/basketball_nba/events/${eventIdArr[i]}/odds?apiKey=${apiKey}&regions=us&markets=${markets.join(',')}${includeAlts?',player_points_alternate':''}&bookmakers=${bms.join(',')}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      const json = await res.json()
      resArr.push(json)
      if (json.err) throw new Error(json.err)
    }
  return resArr
  } catch (err) {
    throw new Error(err)
  }
}

export {getSports, getPlayerProps, getEvents}