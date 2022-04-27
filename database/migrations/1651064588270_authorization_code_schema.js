'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuthorizationCodeSchema extends Schema {
  up () {
    this.create('authorization_codes', (table) => {
      table.increments()
      table.integer('user_id')
      table.string('code')
      table.timestamps()
    })
  }

  down () {
    this.drop('authorization_codes')
  }
}

module.exports = AuthorizationCodeSchema
