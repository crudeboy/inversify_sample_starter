export interface ISendMail {
  to: string;
  otp: string;
}

export interface IMail {
  to: string;
  url: string;
}

export interface IAdminMail {
  to: string;
  url: string;
  password: string;
}
