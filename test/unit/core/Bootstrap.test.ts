import * as core from '../../../src/core';


test('getApp should return a new app with port and host', () => {
    const app = core.Bootstrap.getApp();
    const config = core.Environment.getConfig();
    expect(app.get('host')).toBe(config.server.host);
    expect(app.get('port')).toBe(core.Bootstrap.normalizePort(config.server.port));
});

test('normalizePort should return a valid port', () => {
    expect(core.Bootstrap.normalizePort('0')).toBe(0);
    expect(core.Bootstrap.normalizePort('-1')).toBe(false);
    expect(core.Bootstrap.normalizePort('abc')).toBe('abc');
});
