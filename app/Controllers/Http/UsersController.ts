import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const { name, email, password } = request.only(['name', 'email', 'password'])

    const userVerify = await User.findBy('email', email)
    if (userVerify) {
      return response.status(400).send({ error: 'This user is not valid' })
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    return response.status(201).send(user)
  }

  public async index() {
    return await User.all()
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.findBy('id', id)
    if (!user) {
      return response.status(404).send({ error: 'This user does not exists' })
    }

    await user.delete()
    return { message: `${user.id} deleted` }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const { name, email, password } = request.only(['name', 'email', 'password'])

    const user = await User.findBy('id', id)
    if (!user) {
      return response.status(404).send({ error: 'This user does not exists' })
    }

    const userUpdated = await User.query().where('id', id).update({
      name,
      email,
      password,
    })

    return userUpdated
  }
}
