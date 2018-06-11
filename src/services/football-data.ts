import axios from 'axios'
import {pick} from 'lodash'

import {WORLDCUP_2018_ID} from '../config'
import {
  Competition,
  Fixture,
  IFixtureJson,
  IStandingJson,
  Standing
} from '../models'

const FOOTBALL_DATA_API_URL: string = 'https://api.football-data.org/v1'

const COMPETITION_ENDPOINT: string = `/competitions/${WORLDCUP_2018_ID}`
const LEAGUE_TABLE_ENDPOINT: string = `/competitions/${WORLDCUP_2018_ID}/leagueTable`
const FIXTURES_ENDPOINT: string = `/competitions/${WORLDCUP_2018_ID}/fixtures`

export default {
  async getCompetition(): Promise<Competition> {
    const {data} = await axios.get(
      `${FOOTBALL_DATA_API_URL}${COMPETITION_ENDPOINT}`
    )

    return pick(data, [
      'caption',
      'league',
      'year',
      'numberOfTeams',
      'numberOfGames'
    ])
  },

  async getAllStandings(): Promise<Map<string, Array<Standing>>> {
    const {
      data: {standings: standingsJson}
    } = await axios.get(`${FOOTBALL_DATA_API_URL}${LEAGUE_TABLE_ENDPOINT}`)
    const result: Map<string, Array<Standing>> = Object.keys(
      standingsJson
    ).reduce((acc, table) => {
      const standings = standingsJson[table].map(
        (standing: IStandingJson) => new Standing(standing)
      )

      acc.set(table, standings)

      return acc
    }, new Map())

    return result
  },

  async getStandings(tableName: string): Promise<Array<Standing>> {
    const normalizedTableName: string = tableName.toUpperCase()
    const standings: Map<string, Array<Standing>> = await this.getAllStandings()
    const result = standings.get(normalizedTableName) || []

    return result
  },

  async getFixtures(): Promise<Array<Fixture>> {
    const {
      data: {fixtures: fixturesJson}
    } = await axios.get(`${FOOTBALL_DATA_API_URL}${FIXTURES_ENDPOINT}`)

    const fixtures: Array<Fixture> = fixturesJson.map(
      (fixture: IFixtureJson) => new Fixture(fixture)
    )

    return fixtures
  }
}
