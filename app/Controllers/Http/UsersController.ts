import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from '@ioc:Adonis/Core/Hash'
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

    // @ts-expect-error ⠀⠀⠀
    delete user.password

    return response.status(201).send(user)
  }

  public async index({ response }: HttpContextContract) {
    const user = await User.query().select('id', 'name', 'email', 'created_at', 'updated_at')

    return response.status(200).send(user)
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

    // @ts-expect-error ⠀⠀⠀
    delete userUpdated.password

    return userUpdated
  }

  public async login({ auth, response, request }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.query().where('email', email).firstOrFail()
      if (!(await Hash.verify(user.password, password))) {
        return response.status(401).send({ error: 'Invalid credentials' })
      }

      const token = await auth.use('api').generate(user, {
        expiresIn: '1day',
      })

      return token
    } catch (err) {
      return response.status(401).send({ error: 'Invalid credentials' })
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true,
    }
  }
}
