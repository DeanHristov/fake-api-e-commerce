//@see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
export enum STATUS_CODE {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,

    NOT_MODIFIED = 304,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,

    INTERNAL_SERVER = 500,
    NOT_IMPLEMENTED = 501,
    BAT_GATEWAY = 500,
}
