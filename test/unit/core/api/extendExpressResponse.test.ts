import { extendExpressResponse } from '../../../../src/core/api/extendExpressResponse';


describe('extendExpressResponse', () => {

    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    test('Should have all the response helpers', () => {
        extendExpressResponse(req, res, next);
        expect(typeof res.ok).toBe('function');
        expect(typeof res.created).toBe('function');
        expect(typeof res.found).toBe('function');
        expect(typeof res.updated).toBe('function');
        expect(typeof res.destroyed).toBe('function');
        expect(typeof res.failed).toBe('function');
    });

    describe('ok', () => {
        test('Should create to correct response format', () => {
            extendExpressResponse(req, res, next);
            res.ok({ name: 'hans' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: { name: 'hans' }
            });
        });
        test('Should create to correct response format with a message', () => {
            extendExpressResponse(req, res, next);
            res.ok({ name: 'hans' }, { message: 'message' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'message',
                data: { name: 'hans' }
            });
        });
        test('Should create to correct response format with a links', () => {
            extendExpressResponse(req, res, next);
            res.ok({ name: 'hans' }, {
                links: {
                    self: 'link'
                }
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: { name: 'hans' },
                links: {
                    self: 'link'
                }
            });
        });
    });

    describe('created', () => {
        test('Should create to correct response format', () => {
            extendExpressResponse(req, res, next);
            res.created({ name: 'hans' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: { name: 'hans' }
            });
        });
    });

    describe('found', () => {
        test('Should create to correct response format', () => {
            extendExpressResponse(req, res, next);
            res.found([{ name: 'hans' }]);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: [{ name: 'hans' }]
            });
        });
    });

    describe('destroyed', () => {
        test('Should create to correct response format', () => {
            extendExpressResponse(req, res, next);
            res.destroyed();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: null
            });
        });
    });

    describe('failed', () => {
        test('Should create to correct response format', () => {
            extendExpressResponse(req, res, next);
            res.failed(400, 'message', { name: 'hans' });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'message',
                error: { name: 'hans' }
            });
        });
    });

    describe('updated', () => {
        test('Should create to correct response format', () => {
            extendExpressResponse(req, res, next);
            res.updated({ name: 'hans' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: { name: 'hans' }
            });
        });
    });

});
