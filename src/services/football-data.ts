import axios from 'axios'
import {pick} from 'lodash'

import {Standing, IStandingJson} from '../models'

const FOOTBALL_DATA_API_URL: string = 'https://api.football-data.org/v1'

const WORLDCUP_ENDPOINT: string = '/competitions/467'
const LEAGUE_TABLE_ENDPOINT: string = '/competitions/467/leagueTable'

export interface Competition {
  caption: string
  league: string
  year: string
  numberOfTeams: number
  numberOfGames: number
}

export default {
  async getCompetition(): Promise<Competition> {
    const {data} = await axios.get(
      `${FOOTBALL_DATA_API_URL}${WORLDCUP_ENDPOINT}`
    )

    return pick(data, [
      'caption',
      'league',
      'year',
      'numberOfTeams',
      'numberOfGames'
    ])
  },

  async getStandings(tableName: string): Promise<Array<Standing>> {
    const {
      data: {standings: standingsJson}
    } = await axios.get(`${FOOTBALL_DATA_API_URL}${LEAGUE_TABLE_ENDPOINT}`)
    const normalizedTableName: string = tableName.toUpperCase()
    const standings: Array<Standing> = standingsJson[normalizedTableName]
      ? standingsJson[normalizedTableName].map(
          (data: IStandingJson) => new Standing(data)
        )
      : []

    return standings
  }
}
