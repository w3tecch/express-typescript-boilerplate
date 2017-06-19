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

// Helps to add metadata to classes with annotations
import 'reflect-metadata';

// Defines the main dependencies and returns the
// bootstrap instance to get the server started.
import { App } from './core/App';
import { CustomConfig } from './config/CustomConfig';

export const app = new App([

    // Here you can add more custom configurations
    new CustomConfig()

]);

// Launch the server with all his awesome features.
app.main();
