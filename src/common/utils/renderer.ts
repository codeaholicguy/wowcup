//@ts-ignore
import * as cfonts from 'cfonts'
import * as Chalk from 'chalk'
import * as emoji from 'node-emoji'

import {Fixture, Standing} from '../../models'
import {FixturesTableBuilder, StandingsTableBuilder} from '../table-builder'

const c = Chalk.default

export default {
  renderHeader(): void {
    cfonts.say('2018 FIFA World Cup', {
      font: 'block',
      align: 'left',
      colors: ['red'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0'
    })
  },

  renderStandings(tableName: string, standings: Array<Standing>): void {
    console.log(
      emoji.get('soccer'),
      c.cyan.bold(`League table ${tableName.toUpperCase()}`)
    )

    const table = new StandingsTableBuilder(standings)

    console.log(table.buildTable().toString())
  },

  renderAllStandings(standings: Map<string, Array<Standing>>): void {
    standings.forEach((tableStandings, table) => {
      this.renderStandings(table, tableStandings)
    })
  },

  renderFixtures(fixtures: Array<Fixture>): void {
    const table = new FixturesTableBuilder(fixtures)

    console.log(table.buildTable().toString())
  }
}
