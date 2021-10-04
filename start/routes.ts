import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/games', 'GamesController.create')
  Route.get('/games', 'GamesController.index')
  Route.delete('/games/:id', 'GamesController.delete')
  Route.put('/games/:id', 'GamesController.update')
})

Route.group(() => {
  Route.post('/users/login', 'UsersController.login')
  Route.post('/users/logout', 'UsersController.logout')
  Route.post('/users', 'UsersController.create')
  Route.get('/users', 'UsersController.index')
  Route.delete('/users/:id', 'UsersController.delete')
  Route.put('/users/:id', 'UsersController.update')
})
