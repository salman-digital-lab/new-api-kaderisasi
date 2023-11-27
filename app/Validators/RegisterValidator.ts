import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fullname: schema.string(),
    email: schema.string({}, [rules.email()]),
    password: schema.string([rules.confirmed()]),
  })

  public messages = {}
}
