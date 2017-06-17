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

// It also loads the .env file into the 'process.env' variable.
require('dotenv').config();

// Helps to add metadata to classes with annotations
import 'reflect-metadata';

// Configures the logger
import '../config/Logger';

import * as commander from 'commander';

// import { DatabaseResetCommand } from './DatabaseResetCommand';
// import { MakeResourceCommand } from './MakeResourceCommand';
// import { MakeModelCommand } from './MakeModelCommand';
import { MakeRepoCommand } from './MakeRepoCommand';
import { MakeServiceCommand } from './MakeServiceCommand';
import { MakeControllerCommand } from './MakeControllerCommand';
import { MakeExceptionCommand } from './MakeExceptionCommand';
import { MakeListenerCommand } from './MakeListenerCommand';
import { MakeMiddlewareCommand } from './MakeMiddlewareCommand';
import { MakeRequestCommand } from './MakeRequestCommand';
// import { UpdateTargetsCommand } from './UpdateTargetsCommand';
// import { MakeMigrationCommand } from './MakeMigrationCommand';
import { MakeSeedCommand } from './MakeSeedCommand';

/**
 * Add your new commands here
 */
[
    // DatabaseResetCommand,
    // MakeResourceCommand,
    // MakeModelCommand,
    MakeRepoCommand,
    MakeServiceCommand,
    MakeControllerCommand,
    MakeExceptionCommand,
    MakeListenerCommand,
    MakeMiddlewareCommand,
    MakeRequestCommand,
    // MakeMigrationCommand,
    MakeSeedCommand
    // UpdateTargetsCommand
].forEach((Command) =>
    commander
        .command(Command.command)
        .description(Command.description)
        .action(() => Command.action(new Command())));


commander.parse(process.argv);
