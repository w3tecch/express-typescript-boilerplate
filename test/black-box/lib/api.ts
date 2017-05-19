require('dotenv').config();
import * as request from 'request-promise';
import { OptionsWithUri } from 'request-promise';
import { ApiResponeTest } from './ApiResponeTest';


export const api = async (method: string, path: string, options: OptionsWithUri = { uri: '' }) => {
    options.method = method;
    options.uri = `${process.env.APP_HOST}:${process.env.APP_PORT}${path}`;
    options.resolveWithFullResponse = true;
    return new ApiResponeTest(await request(options));
};
