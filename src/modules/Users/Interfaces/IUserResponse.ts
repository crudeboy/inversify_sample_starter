export interface IUserResponse {
  id: string;
  full_name: string;
  address: string;
  country: string;
  profession: string;
  // gender: string;
  email: string;
  user_type: string;
  password?: string;
  is_email_verified: boolean;
  otp?: string;
  otp_expires_at?: number;
}

export interface IFranchiseeResponse {
  id: string;
  full_name: string;
  address: string;
  country: string;
  profession?: string;
  // gender: string;
  email: string;
  user_type: string;
  password?: string;
  is_email_verified: boolean;
  otp?: string;
  otp_expires_at?: number;
}

export interface ISignInUser {
  id: string;
  full_name: string;
  address: string;
  country: string;
  profession: string;
  gender: string;
  email: string;
  user_type: string;
  password?: string;
  is_email_verified: boolean;
}

export interface IUserLogInResponse {
  id: string;
  full_name: string;
  address: string;
  country: string;
  profession: string;
  email: string;
  user_type: string;
  password: string;
}
