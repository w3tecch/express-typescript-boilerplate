import * as core from '../../../src/core';


test('getName() should return the test env', () => {
    expect(core.Environment.getName()).toBe('test');
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

test('getConfig() should return the config for the test env', () => {
    const config = core.Environment.getConfig();
    expect(config).toBeDefined();
    expect(config.server).toBeDefined();
    expect(config.logger).toBeDefined();
    expect(config.auth0).toBeDefined();
    expect(config.database).toBeDefined();
});
