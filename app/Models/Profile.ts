import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public name: string

  @column()
  public gender: string

  @column()
  public phone: string

  @column()
  public province_id: number

  @column()
  public regency_id: number

  @column()
  public district_id: number

  @column()
  public village_id: number

  @column.date()
  public date_of_birthday: DateTime

  @column()
  public city_of_birth: string

  @column()
  public from_address: string

  @column()
  public current_address: string

  @column()
  public university_id: number

  @column()
  public faculty: string

  @column()
  public major: string

  @column()
  public student_id: number

  @column()
  public intake_year: string

  @column()
  public role_id: number

  @column()
  public is_active: boolean

  @column()
  public salt: string

  @column()
  public ssc: number

  @column()
  public lmd: number

  @column()
  public komprof: number

  @column()
  public spectra: number

  @column()
  public is_subscribing: boolean

  @column()
  public file_image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>
}
