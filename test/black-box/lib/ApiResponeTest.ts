import * as _ from 'lodash';


export class ApiResponeTest {
    constructor(private res: any) { }

    getBody<T>(): T {
        return this.res['body'];
    }

    getData<T>(): T {
        return this.getBody()['data'];
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
        const d = _.isArray(this.getData()) ? this.getData()[0] : this.getData();
        const b = Object.keys(d).sort();
        expect(_.isEqual(a, b)).toBeTruthy();
        expect(this.getBody()['success']).toBeTruthy();
        return this;
    }
}
