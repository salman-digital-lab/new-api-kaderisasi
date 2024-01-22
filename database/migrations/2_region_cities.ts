import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'region_cities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('province_id').references('region_provinces.id').onDelete('CASCADE')
      table.string('name')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
