/**
 * core
 * ------------------------------------------------
 *
 * This file should be the first to import. It loads the
 * essentials modules and configurations.
 *
 * It also loads the .env file into the 'process.env' variable.
 */

require('dotenv').config();
import 'reflect-metadata';
import '../config/Logger';
