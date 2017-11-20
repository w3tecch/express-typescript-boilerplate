import { Request } from 'express';
import * as MockExpressRequest from 'mock-express-request';
import { AuthService } from './../../../src/auth/AuthService';


describe('AuthService', () => {

    let authService: AuthService;
    beforeEach(() => {
        authService = new AuthService();
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

});
