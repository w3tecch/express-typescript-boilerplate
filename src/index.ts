/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * Gery Hirscheld<@hirsch88>
 *
 * This is a boilerplate for Node.js app written in TypeScript.
 * We used the framework Express.js as a basic layer.
 */

// Import our app and the core server helper
import './core';
import { Server } from './core/Server';
import app from './app';

// Start our app and listen for it
const server = app.listen(app.get('port'));
Server.use(server, app);
