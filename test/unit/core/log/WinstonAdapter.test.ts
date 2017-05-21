import { WinstonAdapter } from '../../../../src/core/log/WinstonAdapter';


describe('WinstonAdapter', () => {

    let log;
    beforeEach(() => {
        log = new WinstonAdapter('test:scope');
    });

    test('Should have all log methods', () => {
        expect(typeof log.debug).toBe('function');
        expect(typeof log.info).toBe('function');
        expect(typeof log.warn).toBe('function');
        expect(typeof log.error).toBe('function');
    });

});
