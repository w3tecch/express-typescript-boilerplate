/**
 * core
 * ------------------------------------------------
 *
 * This file should be the first to import. It loads the
 * essentials modules and configurations before the main
 * start up process. It gives all the dependencies that
 * the bootstrap-process need.
 */

// It also loads the .env file into the 'process.env' variable.
import * as dotenv from 'dotenv';
dotenv.config();

// Helps to add metadata to classes with annotations
import 'reflect-metadata';

// Configures the logger
import '../config/Logger';

// Returns the Bootstrap instance to startup the application
export * from './Bootstrap';
