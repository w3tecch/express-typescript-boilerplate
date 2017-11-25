export class EventDispatcherMock {

    public dispatchMock = jest.fn();

    public dispatch(...args: any[]): void {
        this.dispatchMock(args);
    }

}
