export interface IEmail {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: number;
}

export interface IForgetPassword {
  email: string;
  url: string;
}

export interface IResetPassword {
  email: string;
  token: string;
  password: string;
}
