require('dotenv').config();
import * as request from 'request-promise';
import { Options } from 'request-promise';
import { ApiResponeTest } from './ApiResponeTest';


export interface ApiOptions<T> {
    body?: T;
    headers?: any;
}


export const api = async <T>(method: string, path: string, options: ApiOptions<T> = {}) => {
    let o: Options = {
        method: method,
        uri: `${process.env.APP_HOST}:${process.env.APP_PORT}${path}`,
        resolveWithFullResponse: true,
        headers: options.headers,
        json: true,
        body: options.body
    };
    return new ApiResponeTest(await request(o));
};
