import { Log } from '../../../../src/core/log/Log';


describe('Log', () => {

    let log, adapter;
    beforeEach(() => {
        log = new Log('test:scope');
    });

    test('Should have all static log methods', () => {
        expect(typeof Log.debug).toBe('function');
        expect(typeof Log.info).toBe('function');
        expect(typeof Log.warn).toBe('function');
        expect(typeof Log.error).toBe('function');
    });

    test('Should have all log methods', () => {
        expect(typeof log.debug).toBe('function');
        expect(typeof log.info).toBe('function');
        expect(typeof log.warn).toBe('function');
        expect(typeof log.error).toBe('function');
    });

});
