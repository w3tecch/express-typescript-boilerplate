import { HttpError } from 'routing-controllers';
import * as MockExpressResponse from 'mock-express-response';
import { ErrorHandlerMiddleware } from '../../../src/api/middlewares/ErrorHandlerMiddleware';
import { LogMock } from '../lib/LogMock';


describe('ErrorHandlerMiddleware', () => {

    test('Should not print stack out in production', () => {
        const middleware = new ErrorHandlerMiddleware(new LogMock());
        middleware.isProduction = true;

        const res = new MockExpressResponse();
        const err = new HttpError(400, 'Test Error');
        middleware.error(err, undefined, res, undefined);
        const json = res._getJSON();
        expect(json.name).toBe(err.name);
        expect(json.message).toBe(err.message);
        expect(json.stack).toBeUndefined();
    });

    test('Should print stack out in production', () => {
        const middleware = new ErrorHandlerMiddleware(new LogMock());
        middleware.isProduction = false;

        const res = new MockExpressResponse();
        const err = new HttpError(400, 'Test Error');
        middleware.error(err, undefined, res, undefined);
        const json = res._getJSON();
        expect(json.name).toBe(err.name);
        expect(json.message).toBe(err.message);
        expect(json.stack).toBeDefined();
    });

});
