import { RequestBody } from '../../../../src/core/api/RequestBody';
import { IsNotEmpty } from 'class-validator';


describe('RequestBody', () => {
    describe('constructor', () => {
        test('Should construct with the given input and set all values', () => {
            const r = new RequestBody({ a: 1 });
            expect(r['a']).toBe(1);
        });
        test('Should construct with the given input and set all values', () => {
            const r = new RequestBody({ a: 1 });
            expect(r['a']).toBe(1);
        });
    });
    describe('validate', () => {
        test('Should pass if no validators are defined', async () => {
            const r = new RequestBody();
            const e = await r.validate();
            expect(e).toBe(undefined);
        });
        test('Should pass if no validators are defined', async () => {
            class TestBody extends RequestBody {
                @IsNotEmpty() public value: string;
            }
            const r = new TestBody();
            try {
                await r.validate();
            } catch (error) {
                expect(error.name).toBe('ValidationException');
            }
        });
    });
    // describe('toJSON', () => {
    //     test('Should return the set values as new json object', () => {
    //         const r = new RequestBody({ a: 1 });
    //         const o = r.toJSON();
    //         expect(o.a).toBe(1);
    //     });
    // });
    // describe('set', () => {
    //     test('Should set value the key property', () => {
    //         class TestBody extends RequestBody {
    //             @IsNotEmpty() value: string;

    //             setValue(value: string): void {
    //                 this.set('value', value);
    //             }
    //         }
    //         const tb = new TestBody();
    //         tb.setValue('yes');
    //         expect(tb.value).toBe('yes');
    //     });
    // });
    // describe('update', () => {
    //     test('Should set value the key property', () => {
    //         class TestBody extends RequestBody {
    //             @IsNotEmpty() valueA: string;
    //             @IsNotEmpty() valueB: string;

    //             updateValue(key: string, value: any): void {
    //                 this.update(key, value);
    //             }
    //         }
    //         const tb = new TestBody({
    //             valueA: 'no',
    //             valueB: 'no'
    //         });
    //         tb.updateValue('valueA', 'yes');
    //         tb.updateValue('valueB', undefined);
    //         expect(tb.valueA).toBe('yes');
    //         expect(tb.valueB).toBe('no');
    //     });
    // });
});
