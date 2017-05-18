import { Bootstrap } from '../../../src/core/Bootstrap';


test('getApp should return a new app with port and host', () => {
    process.env.APP_HOST = 'host';
    process.env.PORT = '3000';
    const app = Bootstrap.getApp();
    expect(app.get('host')).toBe(process.env.APP_HOST);
    expect(app.get('port')).toBe(Bootstrap.normalizePort(process.env.PORT));
});

test('normalizePort should return a valid port', () => {
    expect(Bootstrap.normalizePort('0')).toBe(0);
    expect(Bootstrap.normalizePort('-1')).toBe(false);
    expect(Bootstrap.normalizePort('abc')).toBe('abc');
});

