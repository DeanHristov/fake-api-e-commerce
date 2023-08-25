import {STATUS_CODE} from './statusCodes';

export default class ErrorResponse extends Error {
    public statusCode: STATUS_CODE;

    constructor(message: string, statusCode: STATUS_CODE) {
        super(message);
        this.statusCode = statusCode;
    }
}
