declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
      user_type: string;
    };
  }
}
