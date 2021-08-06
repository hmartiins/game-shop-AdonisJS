import { DateTime } from 'luxon'
import { v4 as uuid } from 'uuid'

import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async createUUID(model: User) {
    model.id = uuid()
  }

  @column({ isPrimary: true })
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
