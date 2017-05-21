import { populateUser as PopulateUser } from '../../../../src/api/middlewares/populateUser';


describe('populateUser', () => {

    let populateUser, userService, log, res, req, next;
    beforeEach(() => {
        process.env.AUTH0_HOST = 'test';
        log = {
            debug: jest.fn(),
            warn: jest.fn()
        };
        populateUser = PopulateUser(() => userService, log);
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
        populateUser(req, res, next);
        expect(res.failed).toBeCalledWith(400, 'Missing token information!');
        req.tokeninfo = undefined;
        populateUser(req, res, next);
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
                    expect(log.debug).toHaveBeenCalledWith(`populated user with the id=88 to the request object`);
                    expect(next).toBeCalled();
                });
            })
        };
        const pop = PopulateUser(() => userService, log);
        pop(req, res, next);
    });

    test('Should behave...', () => {
        userService = {
            findByUserId: jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    reject(new Error('test'));
                    expect(req.user).toBeUndefined();
                    expect(log.warn).toHaveBeenCalledWith(`could not populate user to the request object`);
                    expect(next).toBeCalled();
                });
            })
        };
        const pop = PopulateUser(() => userService, log);
        pop(req, res, next);
    });

});
