import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable().default(null)
      table.string('slug', 255).unique().notNullable().default(null)
      table.text('description').nullable()
      table.date('begin_date').notNullable().default(null)
      table.date('end_date').notNullable().default(null)
      table.date('register_begin_date').notNullable().default(null)
      table.date('register_end_date').notNullable().default(null)
      table.enu('status', ['OPENED', 'CLOSED']).default('OPENED')
      table.integer('minimum_role_id', 11).default(0)
      table.integer('category_id', 11).unsigned().nullable().default(null)
      table
        .foreign('category_id')
        .references('activity_categories.id')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.text('form_data', 'longtext').nullable().default('[]')
      table.integer('is_published', 1).default(1)
      table.integer('is_deleted', 1).default(0)
      table.integer('viewer', 11).default(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
