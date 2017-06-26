import * as _ from 'lodash';


export class ApiResponeTest {

    constructor(private error: any, private res: any) {
    }

    public getBody<T>(): T {
        return this.res['body'];
    }

    public getData<T>(): T {
        return this.getBody()['data'];
    }

    public getHeaders<T>(): T {
        if (this.res) {
            return this.res['headers'];
        } else {
            return this.error['response']['headers'];
        }
    }

    public expectStatusCode(code: number): ApiResponeTest {
        if (this.res) {
            expect(this.res['statusCode']).toBe(code);
        } else {
            expect(this.error['statusCode']).toBe(code);
        }
        return this;
    }

    public expectJson(): ApiResponeTest {
        expect(this.getHeaders()['content-type']).toContain('json');
        return this;
    }

    public expectData(keys: string[]): ApiResponeTest {
        const a = keys.sort();
        const d = _.isArray(this.getData()) ? this.getData()[0] : this.getData();
        const b = Object.keys(d).sort();
        expect(_.isEqual(a, b)).toBeTruthy();
        expect(this.getBody()['success']).toBeTruthy();
        return this;
    }

    public printResponse(): void {
        console.log(this.res);
    }

    public printError(): void {
        console.log(this.error);
    }

}
