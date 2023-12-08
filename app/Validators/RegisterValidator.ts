import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/PublicUser'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    fullname: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: User.table, column: 'email' })]),
    password: schema.string(),
  })

  public messages = {}
}
