import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable().defaultTo(null)
      table.string('slug', 255).unique().notNullable().defaultTo(null)
      table.text('description').nullable()
      table.date('begin_date').notNullable().defaultTo(null)
      table.date('end_date').notNullable().defaultTo(null)
      table.date('register_begin_date').notNullable().defaultTo(null)
      table.date('register_end_date').notNullable().defaultTo(null)
      table.enu('status', ['OPENED', 'CLOSED']).defaultTo('OPENED')
      table.integer('minimum_role_id', 11).defaultTo(0)
      table.integer('category_id', 11).unsigned().nullable().defaultTo(null)
      table
        .foreign('category_id')
        .references('activity_categories.id')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.text('form_data', 'longtext').nullable().defaultTo('[]')
      table.integer('is_published', 1).defaultTo(1)
      table.integer('is_deleted', 1).defaultTo(0)
      table.integer('viewer', 11).defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
