/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary(); // Crea una columna 'id' que se autoincrementa y es clave primaria
    table.string("name").notNullable(); // Crea una columna 'name' que no puede ser nula
    table.string("email").notNullable().unique(); // Crea una columna 'email' que no puede ser nula y debe ser única
    table.string("hashed_password").notNullable(); // Crea una columna 'hashed_password' que no puede ser nula
    table.dateTime("last_session_utc").nullable(); // Crea una columna 'last_session_utc' que puede ser nula
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user"); // Elimina la tabla 'users'
};
