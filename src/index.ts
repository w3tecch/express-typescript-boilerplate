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

// Defines the main dependencies and returns the
// bootstrap instance to get the server started.
import { bootstrap } from './core';

// Custom express application configuration.
import './app';

// Launch the server with all his awesome features.
bootstrap.main();
