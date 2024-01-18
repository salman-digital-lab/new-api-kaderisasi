import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/PublicUser'
import Profile from 'App/Models/Profile'
import Activity from 'App/Models/Activity'
import StudentCare from 'App/Models/Studentcare'
import ProfileValidator from 'App/Validators/UpdateProfileValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class ProfilesController {
  public async show({ response, auth }: HttpContextContract) {
    try {
      const user: any = auth.user
      const userData: any = await User.find(user.id)
      const profile: any = await Profile.query()
        .select('*')
        .where('user_id', user.id)
        .preload('university')
        .preload('role')
        .preload('province')
        .preload('regency')

      return response.ok({
        status: 'success',
        message: 'Get user profile success',
        data: { userData, profile },
      })
    } catch (error) {
      return response.internalServerError({
        status: error.status,
        message: 'Get user profile failed',
        error: error.message,
      })
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    try {
      const payload: any = await request.validate(ProfileValidator)
      const id: any = auth.user?.id
      const profile: any = await Profile.findByOrFail('user_id', id)
      const updated: any = await profile.merge(payload).save()

      return response.ok({
        status: 'success',
        message: 'Update user profile success',
        data: updated,
      })
    } catch (error) {
      return response.internalServerError({
        status: error.status,
        message: 'Update user profile failed',
        error: error.message,
      })
    }
  }

  public async studentCare({ response, auth }: HttpContextContract) {
    try {
      const id: any = auth.user?.id
      const history: any = await StudentCare.query()
        .select(
          'problem_category',
          'problem_category_desk',
          'technical handling',
          'status handling'
        )
        .where('user_id', id)
        .preload('counselor')

      return response.ok({
        status: 'success',
        message: 'Get student care data success',
        data: history,
      })

    } catch (error) {
      return response.internalServerError({
        status: error.status,
        message: 'Get student care data failed',
        error: error.message,
      })
    }
  }
}
