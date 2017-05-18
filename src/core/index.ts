/**
 * CORE
 * ----------------------------------------
 *
 * Gery Hirscheld<@hirsch88>
 *
 * Please use this file to use any of the core components
 */

/**
 * Loads your .env file data into the process.env
 */
require('dotenv').config();
import 'reflect-metadata';

/**
 * Define the log adapter for this application
 */
import { Log, WinstonAdapter, DebugAdapter } from './log';
Log.addAdapter('winston', WinstonAdapter);
Log.addAdapter('debug', DebugAdapter);
Log.setAdapter(process.env.LOG_ADAPTER);
