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
      table.integer('province_id', 2)
      table.foreign('province_id').references('id').inTable('region_provinces')
      table.integer('regency_id', 4)
      table.foreign('regency_id').references('id').inTable('region_regencies')
      table.integer('district_id', 7)
      table.foreign('district_id').references('id').inTable('region_districts')
      table.integer('village_id', 10)
      table.foreign('village_id').references('id').inTable('region_villages')
      table.date('date_of_birthday')
      table.string('city_of_birth', 35)
      table.string('from_address', 255)
      table.string('current_address', 255)
      table.integer('university_id').unsigned()
      table.foreign('university_id').references('id').inTable('universities')
      table.string('faculty', 50)
      table.string('major', 50)
      table.string('student_id', 25)
      table.string('intake_year', 4)
      table.integer('role_id').defaultTo(4)
      table.integer('is_active').defaultTo(1)
      table.string('salt')
      table.integer('ssc')
      table.integer('lmd')
      table.integer('komprof')
      table.integer('spectra')
      table.integer('is_subscribing').defaultTo(1)
      table.string('file_image', 100)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
