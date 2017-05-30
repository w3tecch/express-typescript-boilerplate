/**
 * console.Commander
 * ------------------------------------------------
 *
 * Here you can define your console commands, so you are able
 * to use them in the terminal with 'npm run console <command>'.
 *
 * These console commands can also be accessed in the production
 * environment. For example to import users.
 */
import * as commander from 'commander';
import { DatabaseResetCommand } from './DatabaseResetCommand';


/**
 * DatabaseResetCommand
 */
commander
    .command(DatabaseResetCommand.command)
    .description(DatabaseResetCommand.description)
    .action(() => DatabaseResetCommand.action());


commander.parse(process.argv);
