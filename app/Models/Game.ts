import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'

import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID(model: Game) {
    model.id = uuid()
  }

  @column({ isPrimary: true })
  public name: string

  @column()
  public description: string

  @column()
  public image: string

  @column()
  public amount: number

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
