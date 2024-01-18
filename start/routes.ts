import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
    Route.post('/logout', 'AuthController.logout').middleware('auth')
  }).prefix('/auth')
  Route.group(() => {
    Route.get('/', 'AuthController.show')
    Route.put('/', 'AuthController.update')
  })
    .prefix('/profile')
    .middleware('auth')
}).prefix('/v2')
