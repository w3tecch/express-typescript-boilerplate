import * as core from '../../../src/core';


test('getName() should return the test env', () => {
    expect(core.Environment.getNodeEnv()).toBe('test');
});

test('isTest() should be true', () => {
    expect(core.Environment.isTest()).toBeTruthy();
});

test('isDevelopment() should be false', () => {
    expect(core.Environment.isDevelopment()).toBeFalsy();
});

test('isProduction() should be false', () => {
    expect(core.Environment.isProduction()).toBeFalsy();
});
