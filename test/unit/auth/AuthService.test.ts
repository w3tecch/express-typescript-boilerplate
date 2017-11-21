import { Request } from 'express';
import * as request from 'request';
import * as MockExpressRequest from 'mock-express-request';
import * as nock from 'nock';
import { AuthService } from './../../../src/auth/AuthService';
import { LoggerInterface } from './../../../src/core/LoggerInterface';
import { env } from './../../../src/core/env';


describe('AuthService', () => {

    let authService: AuthService;
    beforeEach(() => {
        const log: LoggerInterface = {
            debug: () => void 0,
            info: () => void 0,
            warn: () => void 0,
            error: () => void 0,
        };
        authService = new AuthService(request, log);
    });

    describe('parseTokenFromRequest', () => {
        test('Should return the token without Bearer', () => {
            const req: Request = new MockExpressRequest({
                headers: {
                    Authorization: 'Bearer 1234',
                },
            });
            const token = authService.parseTokenFromRequest(req);
            expect(token).toBe('1234');
        });

        test('Should return undefined if there is no Bearer', () => {
            const req: Request = new MockExpressRequest({
                headers: {
                    Authorization: 'Basic 1234',
                },
            });
            const token = authService.parseTokenFromRequest(req);
            expect(token).toBeUndefined();
        });

        test('Should return undefined if there is no "Authorization" header', () => {
            const req: Request = new MockExpressRequest();
            const token = authService.parseTokenFromRequest(req);
            expect(token).toBeUndefined();
        });
    });

    describe('getTokenInfo', () => {
        test('Should get the tokeninfo', async (done) => {
            nock(env.auth.route)
                .post('')
                .reply(200, {
                    user_id: 'auth0|test@test.com',
                });

            const tokeninfo = await authService.getTokenInfo('1234');
            expect(tokeninfo.user_id).toBe('auth0|test@test.com');
            done();
        });

        test('Should fail due to invalid token', async (done) => {
            nock(env.auth.route)
                .post('')
                .reply(401, 'Invalid token');

            try {
                await authService.getTokenInfo('1234');
            } catch (error) {
                expect(error).toBe('Invalid token');
            }
            done();
        });
    });

});
