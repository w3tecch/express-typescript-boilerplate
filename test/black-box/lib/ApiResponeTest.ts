import * as _ from 'lodash';


export class ApiResponeTest {

    constructor(private error: any, private res: any) {
    }

    getBody<T>(): T {
        return this.res['body'];
    }

    getData<T>(): T {
        return this.getBody()['data'];
    }

    getHeaders<T>(): T {
        if (this.res) {
            return this.res['headers'];
        } else {
            return this.error['response']['headers'];
        }
    }

    expectStatusCode(code: number): ApiResponeTest {
        if (this.res) {
            expect(this.res['statusCode']).toBe(code);
        } else {
            expect(this.error['statusCode']).toBe(code);
        }
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

    printResponse(): void {
        console.log(this.res);
    }

    printError(): void {
        console.log(this.error);
    }

}
