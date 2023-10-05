// createMigration.mjs
import { exec } from "child_process";
import inquirer from "inquirer";

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      console.log(`Resultado de STDOUT: ${stdout}`);
      console.error(`Resultado de STDERR: ${stderr}`);
      resolve();
    });
  });
};

const createMigration = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "migrationName",
        message: "¿Cuál es el nombre de tu nueva migración?",
        validate: (input) => input && input.trim() !== "",
      },
    ]);

    const migrationCommand = `npx knex migrate:make ${answers.migrationName}`;
    await execPromise(migrationCommand);
  } catch (error) {
    console.error(`Error al ejecutar la migración: ${error}`);
  }
};

createMigration();
