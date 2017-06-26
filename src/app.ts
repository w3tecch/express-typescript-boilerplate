/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * This is a boilerplate for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 *
 * To add express modules go to the 'config/AppConfig.ts' file. All the IOC registrations
 * are in the 'config/IocConfig.ts' file.
 */

import 'reflect-metadata';
import { App } from './core/App';
import { CustomConfig } from './config/CustomConfig';

export const app = new App();


// Here you can add more custom configurations
app.configure(new CustomConfig());

// Launch the server with all his awesome features.
app.bootstrap();
