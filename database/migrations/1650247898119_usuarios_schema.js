'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuariosSchema extends Schema {
  up () {
    this.create('personas', (table) => {
      table.increments()
      table.string('Nombre', 80).notNullable().unique()
      table.string('Apellido', 254).notNullable().unique()
      table.integer('Edad', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuariosSchema
