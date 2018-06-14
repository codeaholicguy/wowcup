import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as emoji from 'node-emoji'

import renderer from '../common/utils/renderer'
import {Fixture} from '../models'
import footballDataService from '../services/football-data'

export default class Fixtures extends Command {
  static description = 'get worldcup fixtures'

  static examples = [
    '$ wowcup fixtures',
    '$ wowcup fixtures -n',
    '$ wowcup fixtures -l',
    '$ wowcup fixtures -p'
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    next: flags.boolean({char: 'n', description: 'get next recent fixtures'}),
    last: flags.boolean({char: 'l', description: 'get last recent fixtures'}),
    playing: flags.boolean({char: 'p', description: 'get playing fixtures'}),
    quiet: flags.boolean({char: 'q', description: 'do not show splash header'})
  }

  async run() {
    const {flags} = this.parse(Fixtures)
    const next = flags.next
    const last = flags.last
    const playing = flags.playing

    if (!flags.quiet) renderer.renderHeader()

    if (next && last && playing) {
      console.log(
        `${emoji.get(
          'interrobang'
        )} you can only get playing, next or last recent fixtures at a time`
      )
    } else {
      cli.action.start(`${emoji.get('soccer')} fetching fixtures`)

      if (next) {
        await this.renderNextRecentFixtures()
      } else if (last) {
        await this.renderLastRecentFixtures()
      } else if (playing) {
        await this.renderPlayingFixtures()
      } else {
        await this.renderAllFixtures()
      }

      cli.action.stop()
    }
  }

  async renderAllFixtures(): Promise<void> {
    const fixtures: Array<Fixture> = await footballDataService.getFixtures()

    renderer.renderFixtures(fixtures)
  }

  async renderNextRecentFixtures() {
    const fixtures: Array<
      Fixture
    > = await footballDataService.getNextRecentFixtures()

    renderer.renderFixtures(fixtures)
  }

  async renderLastRecentFixtures() {
    const fixtures: Array<
      Fixture
    > = await footballDataService.getLastRecentFixtures()

    renderer.renderFixtures(fixtures)
  }

  async renderPlayingFixtures() {
    const fixtures: Array<
      Fixture
    > = await footballDataService.getPlayingFixtures()

    renderer.renderFixtures(fixtures)
  }
}
