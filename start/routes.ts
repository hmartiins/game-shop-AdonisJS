import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/games', 'GamesController.create')
  Route.get('/games', 'GamesController.index')
  Route.delete('/games/:id', 'GamesController.delete')
  Route.put('/games/:id', 'GamesController.update')
})
