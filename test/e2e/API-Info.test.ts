import { api } from './lib/api';


describe('API-Info', () => {
    test('GET   /info   Should return the api info as a json', async () => {
        const res = await api('GET', '/api/info');
        res.expectJson();
        res.expectStatusCode(200);

        const body = res.getBody<any>();
        const pkg = require('../../package.json');
        expect(body.name).toBe(pkg.name);
        expect(body.version).toBe(pkg.version);
        expect(body.description).toBe(pkg.description);
    });
});
