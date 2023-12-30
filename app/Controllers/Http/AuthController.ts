import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/PublicUser'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterValidator)
      const user = await User.create(payload)

      return response.ok({
        status: 'success',
        message: 'Account succesfully registered',
        data: user,
      })
    } catch (error) {
      return response.internalServerError({
        status: error.status,
        message: 'Account registration has failed',
        error: error.message,
      })
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const payload: any = await request.validate(LoginValidator)
      const email: string = payload.email
      const password: string = payload.password
      const user = await User.query().where('email', email).where('isActive', 1).firstOrFail()

      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized('Invalid credentials')
      }

      const token = await auth.use('api').generate(user, { expiresIn: '7 days' })

      return response.ok({
        status: 'success',
        message: 'Login success',
        data: user,
        token,
      })
    } catch (error) {
      return response.internalServerError({
        status: error.status,
        message: 'Login has failed',
        error: error.message,
      })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      if (auth.use('api').isLoggedIn) {
        await auth.use('api').revoke()

        return response.ok({
          status: 'success',
          message: 'You have been logget out',
        })
      }

      return response.ok({
        status: 'success',
        message: 'You have not logged in',
      })
    } catch (error) {
      return response.internalServerError({
        status: error.status,
        message: 'Logout has failed',
        error: error.message,
      })
    }
  }
}
