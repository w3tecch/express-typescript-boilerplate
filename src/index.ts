/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * Gery Hirscheld<@hirsch88>
 *
 * This is a boilerplate for Node.js app written in TypeScript.
 * We used the framework Express.js as a basic layer.
 */

// Define your debug scope level here
process.env.DEBUG = 'app*,api*,core*';

// Define the log adapter for this application
import { DebugAdapter, Log } from './core/log';
Log.setAdapter(DebugAdapter);

// Import our app and the core server helper
import app from './app';
import * as core from './core';

// Start our app and listen for it
const server = app.listen(app.get('port'));
core.Server.use(server, app);
