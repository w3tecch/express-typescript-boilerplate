import { PopulateUserMiddleware } from '../../../../src/api/middlewares/PopulateUserMiddleware';
import { LogMock } from '../../lib/LogMock';


describe('PopulateUserMiddleware', () => {

    let populateUser;
    let userService;
    let res;
    let req;
    let next;
    beforeEach(() => {
        process.env.AUTH0_HOST = 'test';
        populateUser = new PopulateUserMiddleware(LogMock, userService);
        res = {
            failed: jest.fn()
        };
        req = {
            tokeninfo: { user_id: 77 }
        };
        next = jest.fn();
    });

    test('Should fail because no tokeninfo or user_id is given', () => {
        req.tokeninfo.user_id = undefined;
        populateUser.use(req, res, next);
        expect(res.failed).toBeCalledWith(400, 'Missing token information!');
        req.tokeninfo = undefined;
        populateUser.use(req, res, next);
        expect(res.failed).toBeCalledWith(400, 'Missing token information!');
    });

    test('Should pass the database query and attache the user to the request object', () => {
        userService = {
            findByUserId: jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve({
                        toJSON: () => ({
                            id: 88
                        })
                    });
                    expect(req.user.id).toBe(88);
                    expect(next).toBeCalled();
                });
            })
        };
        const pop = new PopulateUserMiddleware(LogMock, userService);
        pop.use(req, res, next);
    });

    test('Should behave...', () => {
        userService = {
            findByUserId: jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    reject(new Error('test'));
                    expect(req.user).toBeUndefined();
                    expect(next).toBeCalled();
                });
            })
        };
        const pop = new PopulateUserMiddleware(LogMock, userService);
        pop.use(req, res, next);
    });

});
