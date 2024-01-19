import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'student_cares'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11).unsigned().notNullable()
      table.foreign('user_id').references('public_users.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.enu('problem_owner', ['Diri Sendiri', 'Teman']).defaultTo(null)
      table.string('problem_owner_name', 35).defaultTo(null)
      table.string('problem_category', 20).notNullable().defaultTo(null)
      table.string('problem_category_desk', 50).defaultTo(null)
      table.enu('technical_handling', ['Online', 'Bertemu langsung']).defaultTo(null)
      table.enu('counselor_gender', ['Laki-laki', 'Perempuan', 'Keduanya']).defaultTo(null)
      table
        .integer('id_counselor')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .enu('status_handling', [
          'Belum Ditangani',
          'Akan Ditangani',
          'Sedang Ditangani',
          'Sudah Ditangani',
          'Gagal Ditangani',
        ])
        .defaultTo('Belum Ditangani')
      table.text('desk_handling').defaultTo(null)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
