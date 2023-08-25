export default class Response<T> {
    public data?: T;
    public status: string;

    constructor(status: string, data?: T) {
        this.status = status;
        this.data = data;
    }
}
