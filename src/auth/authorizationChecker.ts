import { Action } from 'routing-controllers';
import { Container } from 'typedi';
import { Connection } from 'typeorm';

import { Logger } from '../lib/logger';
import { AuthService } from './AuthService';

export function authorizationChecker(connection: Connection): (action: Action, roles: any[]) => Promise<boolean> | boolean {
    const log = new Logger(__filename);
    const authService = Container.get<AuthService>(AuthService);

    return async function innerAuthorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        // here you can use request/response objects from action
        // also if decorator defines roles it needs to access the action
        // you can use them to provide granular access check
        // checker must return either boolean (true or false)
        // either promise that resolves a boolean value
        // demo code:
        const token = authService.parseTokenFromRequest(action.request);

        if (token === undefined) {
            log.warn('No token given');
            return false;
        }

        // Request user info at auth0 with the provided token
        try {
            action.request.tokeninfo = await authService.getTokenInfo(token);
            log.info('Successfully checked token');
            return true;
        } catch (e) {
            log.warn(e);
            return false;
        }
    };
}
