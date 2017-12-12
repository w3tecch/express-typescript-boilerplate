export class RepositoryMock<T> {

    public one: T;
    public list: T[];

    public findMock = jest.fn();
    public findOneMock = jest.fn();
    public saveMock = jest.fn();
    public deleteMock = jest.fn();

    public find(...args: any[]): T[] {
        this.findMock(args);
        return this.list;
    }

    public findOne(...args: any[]): T {
        this.findOneMock(args);
        return this.one;
    }

    public save(value: T, ...args: any[]): T {
        this.saveMock(value, args);
        return value;
    }

    public delete(value: T, ...args: any[]): T {
        this.deleteMock(value, args);
        return value;
    }

}
