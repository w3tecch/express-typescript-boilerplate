import * as request from 'request';
import * as express from 'express';
import { Service } from 'typedi';
import { env } from '../core/env';
import { ITokenInfo } from './ITokenInfo';


@Service()
export class AuthService {

    public parseTokenFromRequest(req: express.Request): string | null {
        const authorization = req.header('authorization');

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            return authorization.split(' ')[1];
        }

        // No token was provided by the client
        return null;
    }

    public getTokenInfo(token: string): Promise<ITokenInfo> {
        return new Promise((resolve, reject) => {
            request({
                method: 'POST',
                url: env.auth.route,
                form: {
                    id_token: token
                }
            }, (error: any, response: request.RequestResponse, body: any) => {
                // Verify if the requests was successful and append user
                // information to our extended express request object
                if (!error) {
                    if (response.statusCode === 200) {
                        const tokeninfo = JSON.parse(body);
                        return resolve(tokeninfo);
                    }
                    return reject(body);
                }
                return reject(error);
            });
        });
    }

}
