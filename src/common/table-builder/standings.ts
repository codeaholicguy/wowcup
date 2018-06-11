import * as Chalk from 'chalk'
import * as Table from 'cli-table2'

import {Standing} from '../../models'

import {BaseTableBuilder} from './base'

const c = Chalk.default

export default class StandingsTableBuilder extends BaseTableBuilder<Standing> {
  public buildTableHeader() {
    return new Table({
      head: [
        c.bold('#'),
        c.bold('Team'),
        c.bold('MP'),
        c.bold('Pts'),
        c.bold('GF'),
        c.bold('GA'),
        c.bold('GD')
      ]
    }) as Table.HorizontalTable
  }
}
