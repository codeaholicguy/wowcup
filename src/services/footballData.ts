import axios from 'axios'
import {pick} from 'lodash'

const FOOTBALL_DATA_API_URL: string = 'https://api.football-data.org/v1'

const WORLDCUP_ENDPOINT: string = '/competitions/467'
const LEAGUE_TABLE_ENDPOINT: string = '/competitions/467/leagueTable'
const FIXTURES_ENDPOINT: string = '/competitions/467/fixtures'

export interface Competition {
  caption: string
  league: string
  year: string
  numberOfTeams: number
  numberOfGames: number
}

export interface Team {
  name: string
  playedGames: number
  points: number
  goals: number
  goalsAgainst: number
  goalDifference: number
}

export default {
  async getCompetitionInfo(): Promise<Competition> {
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

  async getTableTeamsByTableName(tableName: string): Promise<Array<Team>> {
    const {
      data: {standings}
    } = await axios.get(`${FOOTBALL_DATA_API_URL}${LEAGUE_TABLE_ENDPOINT}`)
    const normalizedTableName: string = tableName.toUpperCase()
    const teams: Array<Team> = standings[normalizedTableName]
      ? standings[normalizedTableName].map(
          ({
            team,
            playedGames,
            points,
            goals,
            goalsAgainst,
            goalDifference
          }: {
            team: string
            playedGames: number
            points: number
            goals: number
            goalsAgainst: number
            goalDifference: number
          }) => ({
            name: team,
            playedGames,
            points,
            goals,
            goalsAgainst,
            goalDifference
          })
        )
      : []

    return teams
  }
}
