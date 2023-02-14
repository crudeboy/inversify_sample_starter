export class validationException extends Error {
  errMsg: string | string[];
  error: any;
  constructor(msg: string, public readonly statusCode: number, errMsg: string | string[], error: any) {
    super(msg);
    this.errMsg = errMsg;
    this.error = error;
  }
}
