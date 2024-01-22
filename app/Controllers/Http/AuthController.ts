import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import PublicUser from 'App/Models/PublicUser'
import Profile from 'App/Models/Profile'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterValidator)

      await Database.transaction(async (trx) => {
        const user = new PublicUser()
        user.email = payload.email
        user.password = payload.password
        user.useTransaction(trx)
        await user.save()

        await user.related('profile').create({
          name: payload.fullname,
        })

        return response.ok({
          message: 'REGISTER_SUCCESS',
          data: user,
        })
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.stack,
      })
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(LoginValidator)
      const email: string = payload.email
      const password: string = payload.password
      const user = await PublicUser.query().where('email', email).firstOrFail()

      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized({
          message: 'WRONG_PASSWORD',
        })
      }

      const profile = await Profile.findBy('user_id', user.id)

      if (!profile) {
        return response.forbidden({
          message: 'INACTIVE_ACCOUNT',
        })
      }

      const token = await auth.use('api').generate(user, { expiresIn: '7 days' })

      return response.ok({
        message: 'LOGIN_SUCCESS',
        data: { user, profile, token },
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    try {
      if (auth.use('api').isLoggedIn) {
        await auth.use('api').revoke()

        return response.ok({
          message: 'LOGOUT_SUCCESS',
        })
      }

      return response.ok({
        message: 'HAVE_NOT_LOGGED_IN',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }
}
