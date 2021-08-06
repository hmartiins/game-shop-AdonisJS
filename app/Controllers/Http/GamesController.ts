import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Game from 'App/Models/Game'

export default class GamesController {
  public async create({ request, response }: HttpContextContract) {
    const { name, amount, description, image, price } = request.only([
      'name',
      'amount',
      'description',
      'image',
      'price',
    ])

    const gameVerify = await Game.findBy('name', name)
    if (gameVerify) {
      return response.status(400).send({ error: 'This game is not valid' })
    }

    const game = await Game.create({
      name,
      amount,
      description,
      image,
      price,
    })

    return response.status(201).send(game)
  }

  public async index() {
    return await Game.all()
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const game = await Game.findBy('id', id)
    if (!game) {
      return response.status(404).send({ error: 'This game does not exists' })
    }

    await game.delete()
    return { message: `${game.name} deleted` }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const { name, amount, description, image, price } = request.only([
      'name',
      'amount',
      'description',
      'image',
      'price',
    ])

    const game = await Game.findBy('id', id)
    if (!game) {
      return response.status(404).send({ error: 'This game does not exists' })
    }

    const gameUpdated = await Game.query().where('id', id).update({
      name,
      amount,
      description,
      image,
      price,
    })

    return gameUpdated
  }
}
