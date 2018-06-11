import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as emoji from 'node-emoji'

import renderer from '../common/utils/renderer'
import {Standing} from '../models'
import footballDataService from '../services/football-data'

export default class Standings extends Command {
  static description = 'get worldcup standings'

  static examples = ['$ wowcup standings', '$ wowcup standings -t a']

  static flags = {
    help: flags.help({char: 'h'}),
    table: flags.string({char: 't', description: 'get standings by table'})
  }

  async run() {
    const {flags} = this.parse(Standings)
    const table = flags.table

    renderer.renderHeader()

    if (table) {
      await this.renderStandingsByTable(table)
    } else {
      await this.renderAllTables()
    }
  }

  async renderAllTables(): Promise<void> {
    cli.action.start('fetching all league tables')
    cli.action.stop()
  }

  async renderStandingsByTable(table: string): Promise<void> {
    cli.action.start(
      `${emoji.get('soccer')} fetching league table ${table.toUpperCase()}`
    )

    const standings: Array<Standing> = await footballDataService.getStandings(
      table
    )

    cli.action.stop()

    renderer.renderTeamTable(table, standings)
  }
}
