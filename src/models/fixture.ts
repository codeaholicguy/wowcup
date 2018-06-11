import * as Chalk from 'chalk'
import * as Table from 'cli-table2'
import * as moment from 'moment'
import * as emoji from 'node-emoji'

import {IRowable} from '../common/table-builder/base'

const c = Chalk.default

export enum Status {
  Playing = 'IN_PLAY',
  Finished = 'FINISHED',
  Timed = 'TIMED',
  Scheduled = 'SCHEDULED'
}

const STATUS_TEXT: Map<Status, string> = new Map([
  [Status.Playing, 'Playing'],
  [Status.Finished, 'Finished'],
  [Status.Timed, 'Timed'],
  [Status.Scheduled, 'Scheduled']
])

export interface IFixtureJson {
  date: Date
  status: Status
  homeTeamName: string
  awayTeamName: string
  result: {
    goalsHomeTeam: number
    goalsAwayTeam: number
  }
}

export interface ISide {
  team: string
  goals: number
}

export default class Fixture implements IRowable {
  public date: Date
  public status: Status
  public home: ISide
  public away: ISide

  constructor(data: IFixtureJson) {
    this.date = new Date(data.date)
    this.status = data.status
    this.home = {
      goals: data.result.goalsHomeTeam,
      team: data.homeTeamName
    }
    this.away = {
      goals: data.result.goalsAwayTeam,
      team: data.awayTeamName
    }
  }

  public toRow = (): Table.Cell[] => {
    const hasResult = [Status.Playing, Status.Finished].includes(this.status)
    const score = hasResult
      ? c.bold(
          `${emoji.get('soccer')} ${this.home.goals} - ${
            this.away.goals
          } ${emoji.get('soccer')}`
        )
      : 'N/A'

    return [
      moment(this.date).format('LLLL'),
      this.home.team || 'To be decided',
      score,
      this.away.team || 'To be decided',
      STATUS_TEXT.get(this.status)
    ]
  }
}
