export interface IUpdateUser {
  user_id: string;
  full_name?: string;
  address?: string;
  country?: string;
  profession?: string;
  email?: string;
  otp?: string;
  is_email_verified?: boolean;
  otp_expires_at?: number;
  password?: string;
}

export interface IUpdateDetails {
  full_name?: string;
  address?: string;
  country?: string;
  profession?: string;
  email?: string;
}
