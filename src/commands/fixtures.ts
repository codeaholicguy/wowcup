import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as emoji from 'node-emoji'

import renderer from '../common/utils/renderer'
import {Fixture} from '../models'
import footballDataService from '../services/football-data'

export default class Fixtures extends Command {
  static description = 'get worldcup fixtures'

  static examples = ['$ wowcup fixtures']

  static flags = {
    help: flags.help({char: 'h'})
  }

  async run() {
    renderer.renderHeader()

    cli.action.start(`${emoji.get('soccer')} fetching all fixtures`)

    const fixtures: Array<Fixture> = await footballDataService.getFixtures()

    renderer.renderFixtures(fixtures)

    cli.action.stop()
  }
}
