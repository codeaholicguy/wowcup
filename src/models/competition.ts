export interface ICompetitionJson {
  caption: string
  league: string
  year: string
  numberOfTeams: number
  numberOfGames: number
}

export default class Competition {
  caption: string
  league: string
  year: string
  numberOfTeams: number
  numberOfGames: number

  constructor(data: ICompetitionJson) {
    this.caption = data.caption
    this.league = data.league
    this.year = data.year
    this.numberOfTeams = data.numberOfTeams
    this.numberOfGames = data.numberOfGames
  }
}
