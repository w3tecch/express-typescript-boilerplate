import { authenticate as Authenticate } from '../../../../src/api/middlewares/authenticate';


describe('authenticate', () => {

    let authenticate, request, log, res, req, next;
    beforeEach(() => {
        process.env.AUTH0_HOST = 'test';
        log = {
            debug: jest.fn(),
            info: jest.fn(),
            warn: jest.fn()
        };
        request = jest.fn();
        authenticate = Authenticate(request, log);
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
        authenticate(req, res, next);
        expect(res.failed).toHaveBeenCalledWith(403, 'You are not allowed to request this resource!');

        req.headers.authorization = '';
        authenticate(req, res, next);
        expect(res.failed).toHaveBeenCalledWith(403, 'You are not allowed to request this resource!');

    });

    test('Should set the correct request options', () => {
        request = (options, done) => {
            expect(options.method).toBe('POST');
            expect(options.url).toBe('test/tokeninfo');
            expect(options.form.id_token).toBe('1234');
        };
        const auth = Authenticate(request, log);
        auth(req, res, next);
        expect(log.debug).toHaveBeenCalledWith('Token is provided');

    });

    test('Should pass and add the token info to the request object', () => {
        request = (options, done) => {
            done(null, { statusCode: 200 }, '{ "user_id": 77, "email": "test@jest.org" }');
            expect(req.tokeninfo.user_id).toBe(77);
            expect(log.info).toHaveBeenCalled();
            expect(next).toHaveBeenCalled();
        };
        const auth = Authenticate(request, log);
        auth(req, res, next);
    });

    test('Should fail and respond with a 401 error', () => {
        request = (options, done) => {
            done(null, { statusCode: 401 }, 'Bad message :-)');
            expect(log.warn).toHaveBeenCalled();
            expect(res.failed).toHaveBeenCalledWith(401, 'Bad message :-)');
        };
        const auth = Authenticate(request, log);
        auth(req, res, next);
    });

});
