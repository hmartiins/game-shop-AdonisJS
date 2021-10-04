import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

import Game from 'App/Models/Game'

import Stripe from 'stripe'

export default class GameShopsController {
  public async buyGame({ auth, request, response }: HttpContextContract) {
    await auth.use('api').authenticate()

    const { id } = request.params()
    const { amount } = request.only(['amount'])

    const game = await Game.findBy('id', id)
    if (!id || !game) {
      return response.status(404).send({ error: 'This game does not exists' })
    }

    const stripe = new Stripe(Env.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2020-08-27',
    })

    const sessionStripe = stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1JgohVERf26OukAwF3bLJnLf',
          quantity: amount,
        },
      ],
      payment_method_types: ['card'],

      mode: 'payment',

      success_url: 'http://localhost:3333/success.html',
      cancel_url: 'http://localhost:3333/cancel.html',
    })

    return response.json({ url: (await sessionStripe).url })
  }
}
