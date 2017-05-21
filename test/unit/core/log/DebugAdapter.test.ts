import { DebugAdapter } from '../../../../src/core/log/DebugAdapter';


describe('DebugAdapter', () => {

    let log;
    beforeEach(() => {
        log = new DebugAdapter('test:scope');
    });

    test('Should have all log methods', () => {
        expect(typeof log.debug).toBe('function');
        expect(typeof log.info).toBe('function');
        expect(typeof log.warn).toBe('function');
        expect(typeof log.error).toBe('function');
    });

});
