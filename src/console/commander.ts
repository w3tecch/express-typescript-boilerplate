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
