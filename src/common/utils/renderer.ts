import chalk from 'chalk'

import {Team} from '../../services/footballData'

export default {
  renderHeader(): void {
    const cfonts = require('cfonts')

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

  renderTeamTable(tableName: string, teams: Array<Team>): void {
    const Table = require('cli-table2')
    const table = new Table({
      head: [
        'Team',
        'Played Games',
        'Points',
        'Goals',
        'Goal Againts',
        'Goal Difference'
      ]
    })

    console.log(chalk.red.bold(`League table ${tableName.toUpperCase()}`))

    const data = teams.map((team: Team) => Object.values(team))

    table.push(...data)

    console.log(table.toString())
  }
}
