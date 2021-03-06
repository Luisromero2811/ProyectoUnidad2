'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CodesSchema extends Schema {
  up () {
    this.create('codes', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.string('code').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('codes')
  }
}

module.exports = CodesSchema
