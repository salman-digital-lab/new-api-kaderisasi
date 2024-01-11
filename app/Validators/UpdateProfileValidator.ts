import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    gender: schema.string(),
    phone: schema.string(),
    line_id: schema.string(),
    date_of_birthday: schema.date(),
    city_of_birth: schema.string(),
    province_id: schema.number(),
    regency_id: schema.number(),
    district_id: schema.number(),
    village_id: schema.number(),
    from_address: schema.string(),
    current_address: schema.string(),
    university_id: schema.number(),
    intake_year: schema.number(),
    faculty: schema.string(),
    major: schema.string(),
    student_id: schema.string(),
    is_subscribing: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
