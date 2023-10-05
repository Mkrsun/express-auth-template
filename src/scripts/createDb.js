// createDb.js
const knex = require("knex")(require("../../knexfile"));
import inquirer from "inquirer";

async function createDatabase() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "dbName",
        message:
          "¿Cuál es el nombre de tu nueva base de datos? (dozen_$nombre)",
        validate: (input) => input && input.trim() !== "",
      },
    ]);
    const { dbName } = process.env.DB_NAME;

    // Crear la base de datos
    await knex.raw(`CREATE DATABASE dozen_${dbName}`);
    console.log(`Base de datos ${dbName} creada exitosamente.`);
  } catch (error) {
    console.error("Error creando la base de datos:", error);
  } finally {
    await knex.destroy();
  }
}

createDatabase();
