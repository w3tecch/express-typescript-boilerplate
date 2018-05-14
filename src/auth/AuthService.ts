import * as express from 'express';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../api/models/User';
import { UserRepository } from '../api/repositories/UserRepository';
import { Logger, LoggerInterface } from '../decorators/Logger';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository
    ) { }

    public parseBasicAuthFromRequest(req: express.Request): { username: string, password: string } {
        const authorization = req.header('authorization');

        // Retrieve the token form the Authorization header
        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Token provided by the client');
            const decodedToken = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const username = decodedToken.split(':')[0];
            const password = decodedToken.split(':')[1];
            return { username, password };
        }

        this.log.info('No Token provided by the client');
        return undefined;
    }

    public async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                username,
                password,
            },
        });
        if (user) {
            return user;
        }
        throw new Error('Invalid credentials');
    }

}
