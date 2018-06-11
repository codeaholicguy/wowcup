import * as Chalk from 'chalk'
import * as Table from 'cli-table2'

import {Fixture} from '../../models'

import {BaseTableBuilder} from './base'

const c = Chalk.default

export default class FixturesTableBuilder extends BaseTableBuilder<Fixture> {
  public buildTableHeader() {
    return new Table({
      head: [
        c.bold('Date'),
        c.bold('Home'),
        c.bold('Score'),
        c.bold('Away'),
        c.bold('Match Status')
      ]
    }) as Table.HorizontalTable
  }
}
