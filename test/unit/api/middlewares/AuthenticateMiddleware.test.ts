import { AuthenticateMiddleware } from '../../../../src/api/middlewares/AuthenticateMiddleware';
import { LogMock } from '../../lib/LogMock';

describe('AuthenticateMiddleware', () => {

    let authenticate;
    let request;
    let res;
    let req;
    let next;
    beforeEach(() => {
        process.env.AUTH0_HOST = 'test';
        request = jest.fn();
        authenticate = new AuthenticateMiddleware(LogMock, request);
        res = {
            failed: jest.fn()
        };
        req = {
            headers: { authorization: 'Bearer 1234' }
        };
        next = jest.fn();
    });

    test('Should fail because no token was given', () => {
        req.headers.authorization = undefined;
        authenticate.use(req, res, next);
        expect(res.failed).toHaveBeenCalledWith(403, 'You are not allowed to request this resource!');

        req.headers.authorization = '';
        authenticate.use(req, res, next);
        expect(res.failed).toHaveBeenCalledWith(403, 'You are not allowed to request this resource!');

    });

    test('Should set the correct request options', () => {
        request = (options, done) => {
            expect(options.method).toBe('POST');
            expect(options.url).toBe('test/tokeninfo');
            expect(options.form.id_token).toBe('1234');
        };
        const auth = new AuthenticateMiddleware(LogMock, request);
        auth.use(req, res, next);
    });

    test('Should pass and add the token info to the request object', () => {
        request = (options, done) => {
            done(null, { statusCode: 200 }, '{ "user_id": 77, "email": "test@jest.org" }');
            expect(req.tokeninfo.user_id).toBe(77);
            expect(next).toHaveBeenCalled();
        };
        const auth = new AuthenticateMiddleware(LogMock, request);
        auth.use(req, res, next);
    });

    test('Should fail and respond with a 401 error', () => {
        request = (options, done) => {
            done(null, { statusCode: 401 }, 'Bad message :-)');
            expect(res.failed).toHaveBeenCalledWith(401, 'Bad message :-)');
        };
        const auth = new AuthenticateMiddleware(LogMock, request);
        auth.use(req, res, next);
    });

});
