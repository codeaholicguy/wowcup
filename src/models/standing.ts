import * as Table from 'cli-table2'

import {IRowable} from '../common/table-builder/base'

export interface IStandingJson {
  rank: number
  team: string
  playedGames: number
  points: number
  goals: number
  goalsAgainst: number
  goalDifference: number
}

export default class Standing implements IRowable {
  rank: number
  team: string
  playedGames: number
  points: number
  goals: number
  goalsAgainst: number
  goalDifference: number

  constructor(data: IStandingJson) {
    this.rank = data.rank
    this.team = data.team
    this.playedGames = data.playedGames
    this.points = data.points
    this.goals = data.goals
    this.goalsAgainst = data.goalsAgainst
    this.goalDifference = data.goalDifference
  }

  public toRow = (): Table.Cell[] => {
    return [
      this.rank,
      this.team,
      this.playedGames,
      this.points,
      this.goals,
      this.goalsAgainst,
      this.goalDifference
    ]
  }
}
