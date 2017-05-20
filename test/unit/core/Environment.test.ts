import { Environment } from '../../../src/core/Environment';


describe('Environment', () => {
    test('getName() should return the test env', () => {
        expect(Environment.getNodeEnv()).toBe('test');
    });

    test('isTest() should be true', () => {
        expect(Environment.isTest()).toBeTruthy();
    });

    test('isDevelopment() should be false', () => {
        expect(Environment.isDevelopment()).toBeFalsy();
    });

    test('isProduction() should be false', () => {
        expect(Environment.isProduction()).toBeFalsy();
    });
});
