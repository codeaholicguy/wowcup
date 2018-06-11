import axios from 'axios'
import {head, pick} from 'lodash'
import * as moment from 'moment'

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
  },

  async getNextRecentFixtures(): Promise<Array<Fixture>> {
    const fixtures: Array<Fixture> = await this.getFixtures()
    const result: Map<string, Array<Fixture>> = fixtures
      .filter((fixture: Fixture) => moment().isBefore(fixture.date))
      .reduce((acc: Map<string, Array<Fixture>>, fixture: Fixture) => {
        const key: string = moment(fixture.date).format('L')

        let list: Array<Fixture> | undefined = acc.get(key)

        if (list) {
          list.push(fixture)
        } else {
          list = [fixture]
        }

        acc.set(key, list)

        return acc
      }, new Map<string, Array<Fixture>>())
    const nextRecentDate: string | undefined = head(
      Array.from(result.keys()).sort(
        (a: string, b: string) =>
          moment(new Date(a)).isAfter(new Date(b)) ? 1 : -1
      )
    )

    if (nextRecentDate) {
      return result.get(nextRecentDate) || []
    }

    return []
  },

  async getLastRecentFixtures(): Promise<Array<Fixture>> {
    const fixtures: Array<Fixture> = await this.getFixtures()
    const result: Map<string, Array<Fixture>> = fixtures
      .filter((fixture: Fixture) => moment().isAfter(fixture.date))
      .reduce((acc: Map<string, Array<Fixture>>, fixture: Fixture) => {
        const key: string = moment(fixture.date).format('L')

        let list: Array<Fixture> | undefined = acc.get(key)

        if (list) {
          list.push(fixture)
        } else {
          list = [fixture]
        }

        acc.set(key, list)

        return acc
      }, new Map<string, Array<Fixture>>())
    const lastRecentDate: string | undefined = head(
      Array.from(result.keys()).sort(
        (a: string, b: string) =>
          moment(new Date(a)).isBefore(new Date(b)) ? 1 : -1
      )
    )

    if (lastRecentDate) {
      return result.get(lastRecentDate) || []
    }

    return []
  }
}
