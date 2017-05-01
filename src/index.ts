/**
 * express-typescript-boilerplate
 *
 * @author Gery Hirscheld<@hirsch88>
 *
 * @description
 * This is a boilerplate for Node.js app written in TypeScript. We used the framework Express.js
 * as a basic layer.
 *
 */

process.env.DEBUG = 'app*,api*,core*';

// Define the log adapter for this application
import { DebugAdapter, Log } from './core/log';
Log.setAdapter(DebugAdapter);

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const log = new Log();


// Listen on server events
server.on('listening', () => {
    log.info(`started on ${app.get('host')}:${port}`);
});


server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const addr = server.address();
    switch (error.code) {
        case 'EACCES':
            log.error(`${this.bind(addr)} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            log.error(`${this.bind(addr)} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

