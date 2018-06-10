import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'

import renderer from '../common/utils/renderer'
import footballDataService, {Team} from '../services/footballData'

export default class Table extends Command {
  static description = 'get league table'

  static examples = ['$ wowcup table', '$ wowcup table -g a']

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'get table by name'})
  }

  async run() {
    const {flags} = this.parse(Table)
    const tableName = flags.name

    renderer.renderHeader()

    if (tableName) {
      await this.renderTableByName(tableName)
    } else {
      await this.renderAllTables()
    }
  }

  async renderAllTables(): Promise<void> {
    cli.action.start('fetching all league tables')
    cli.action.stop()
  }

  async renderTableByName(tableName: string): Promise<void> {
    cli.action.start(`fetching league table ${tableName.toUpperCase()}`)

    const teams: Array<
      Team
    > = await footballDataService.getTableTeamsByTableName(tableName)

    cli.action.stop()

    renderer.renderTeamTable(tableName, teams)
  }
}
