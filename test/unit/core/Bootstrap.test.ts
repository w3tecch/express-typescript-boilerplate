import { Bootstrap } from '../../../src/core/Bootstrap';


describe('Bootstrap', () => {
    test('normalizePort should return a valid port', () => {
        expect(Bootstrap.normalizePort('0')).toBe(0);
        expect(Bootstrap.normalizePort('-1')).toBe(false);
        expect(Bootstrap.normalizePort('abc')).toBe('abc');
    });
});
