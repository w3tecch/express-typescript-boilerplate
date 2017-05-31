/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * Gery Hirscheld<@hirsch88>
 *
 * This is a boilerplate for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 *
 * It is very important the '/core' module is loaded first, because this
 * module loads all essentials third-party-libs and our configs we need.
 *
 * To add express modules go to the 'app.ts' file. All the IOC registrations
 * are in the 'container.ts' file.
 */

import './core';
import './app';
import { bootstrap } from './core/Bootstrap';

bootstrap.main();

// import { Server } from './core/Server';
// Start our app and listen for it
// const server = app.listen(app.get('port'));
// Server.use(server, app);

// console.log('app', app);
// app.then(Server.use);
