/**
 * CORE
 * ----------------------------------------
 * It is very important that this file is loaded first, so we
 * can preconfigure and load all necessary stuff.
 */

/**
 * Loads your .env file data into the process.env variable.
 */
require('dotenv').config();
import 'reflect-metadata';

/**
 * Define all log adapters for this application and chose one.
 */
import { Log, WinstonAdapter, DebugAdapter } from './log';
Log.addAdapter('winston', WinstonAdapter);
Log.addAdapter('debug', DebugAdapter);
Log.setAdapter(process.env.LOG_ADAPTER);
