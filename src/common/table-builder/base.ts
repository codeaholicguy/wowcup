import * as Table from 'cli-table2'

export interface IRowable {
  toRow(): Table.Cell[]
}

export abstract class BaseTableBuilder<T extends IRowable> {
  data: T[]

  constructor(data: T[]) {
    this.data = data
  }

  public abstract buildTableHeader(): Table.GenericTable<Table.Cell[]>

  public buildTable() {
    const table = this.buildTableHeader()
    const rows = this.data.map((d: T) => d.toRow())

    table.push(...rows)

    return table
  }
}
