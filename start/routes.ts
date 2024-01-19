import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout').middleware('auth')
  }).prefix('/auth')
  Route.group(() => {
    Route.get('/', 'ProfilesController.show')
    Route.put('/', 'ProfilesController.update')
    Route.get('/student-care', 'ProfilesController.studentCare')
  })
    .prefix('/profile')
    .middleware('auth')
}).prefix('/v2')
