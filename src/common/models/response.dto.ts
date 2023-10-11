export class ResponseDTO {
    statusCode: number;
    message: string;
    data: any;
    length: number;
    timestamp: string = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    constructor(statusCode: number, message: string, data: any, length: number) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.length = length;
    }
}
