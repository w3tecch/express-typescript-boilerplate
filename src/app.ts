import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as compression from 'compression';
import * as favicon from 'serve-favicon';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import * as core from './core';
import * as routes from './routes';
// import * as middlewares from './middlewares';


// Create a new express app
const app = core.Bootstrap.getApp();

// Configure our express application
app.options('*', cors())
    .use(cors())
    .use(helmet())
    .use(helmet.noCache())
    .use(helmet.hsts({
        maxAge: 31536000,
        includeSubdomains: true
    }))
    .use(compression())
    .use(morgan('dev', {
        stream: {
            write: core.Log.info
        }
    }))
    // .use(morgan('combined'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(`${__dirname}/public`))
    .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

    // Add our custom oauth middleware
    // .use('/api', middlewares.auth0GetUser({
    //     host: core.Environment.getConfig().auth0.host,
    //     withQueryString: core.Environment.isDevelopment()
    // }))

    // Append our routes
    .use(routes.web)
    .use(routes.api)
    .use(core.exceptionHandler);


export = app;
