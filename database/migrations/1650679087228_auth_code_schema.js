'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuthCodeSchema extends Schema {
  up () {
    this.create('auth_codes', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('code').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('auth_codes')
  }
}

module.exports = AuthCodeSchema
