class JWTError {
    public readonly message: string;
  
    public readonly statusCode: number;
  
    constructor(message: string, statusCode = 403) {
      this.message = message;
      this.statusCode = statusCode;
    }
  }
  
  export default JWTError;
  