import * as _ from 'lodash';


export class ApiResponeTest {
    constructor(private res: any) { }

    getBody<T>(): T {
        return JSON.parse(this.res['body']);
    }

    getHeaders<T>(): T {
        return this.res['headers'];
    }

    expectStatusCode(code: number): ApiResponeTest {
        expect(this.res['statusCode']).toBe(code);
        return this;
    }

    expectJson(): ApiResponeTest {
        expect(this.getHeaders()['content-type']).toContain('json');
        return this;
    }

    expectData(keys: string[]): ApiResponeTest {
        const a = keys.sort();
        const b = Object.keys(this.getBody()).sort();
        expect(_.isEqual(a, b)).toBeTruthy();
        return this;
    }
}
