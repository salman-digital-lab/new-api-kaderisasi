import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('id').inTable('public_users').onDelete('CASCADE')
      table.string('name', 50).notNullable()
      table.enu('gender', ['M', 'F'])
      table.string('phone', 35)
      table.string('line_id', 50)
      table.string('instagram', 50)
      table.integer('province_id', 2)
      table.foreign('province_id').references('id').inTable('region_provinces')
      table.integer('city_id', 4)
      table.foreign('city_id').references('id').inTable('region_cities')
      table.date('date_of_birthday')
      table.string('city_of_birth', 35)
      table.string('address', 255)
      table.integer('university_id').unsigned()
      table.foreign('university_id').references('id').inTable('universities')
      table.string('faculty', 50)
      table.string('major', 50)
      table.string('student_id', 25)
      table.string('intake_year', 4)
      table.integer('role_id').defaultTo(4)
      table.foreign('role_id').references('id').inTable('roles')
      table.integer('ssc')
      table.integer('lmd')
      table.integer('komprof')
      table.integer('spectra')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
