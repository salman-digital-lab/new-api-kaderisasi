import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PublicUser from 'App/Models/PublicUser'
import Profile from 'App/Models/Profile'
import StudentCare from 'App/Models/StudentCare'
import ProfileValidator from 'App/Validators/UpdateProfileValidator'

export default class ProfilesController {
  public async show({ response, auth }: HttpContextContract) {
    try {
      const user = auth.user
      const userData = await PublicUser.find(user.id)
      const profile = await Profile.query()
        .select('*')
        .where('user_id', user.id)
        .preload('university')
        .preload('role')
        .preload('province')
        .preload('city')

      return response.ok({
        message: 'GET_DATA_SUCCESS',
        data: { userData, profile },
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ProfileValidator)
    try {
      const id = auth.user?.id
      const profile = await Profile.findByOrFail('user_id', id)
      const updated = await profile.merge(payload).save()

      return response.ok({
        message: 'UPDATE_DATA_SUCCESS',
        data: updated,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  public async studentCare({ response, auth }: HttpContextContract) {
    try {
      const id = auth.user?.id
      const history = await StudentCare.query()
        .select('*')
        .where('user_id', id)
        .preload('counselor')

      return response.ok({
        message: 'GET_DATA_SUCCESS',
        data: history,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.stack,
      })
    }
  }
}
