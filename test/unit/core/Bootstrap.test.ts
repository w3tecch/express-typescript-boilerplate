import * as core from '../../../src/core';


test('getApp should return a new app with port and host', () => {
    process.env.APP_HOST = 'host';
    process.env.PORT = '3000';
    const app = core.Bootstrap.getApp();
    expect(app.get('host')).toBe(process.env.APP_HOST);
    expect(app.get('port')).toBe(core.Bootstrap.normalizePort(process.env.PORT));
});

test('normalizePort should return a valid port', () => {
    expect(core.Bootstrap.normalizePort('0')).toBe(0);
    expect(core.Bootstrap.normalizePort('-1')).toBe(false);
    expect(core.Bootstrap.normalizePort('abc')).toBe('abc');
});

