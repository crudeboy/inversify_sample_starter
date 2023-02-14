class AuthorizationError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message = "User is unautorized.", statusCode = 403) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AuthorizationError;
