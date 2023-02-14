export interface ILoggedInUser {
  id: string;
  full_name: string;
  address: string;
  country: string;
  profession: string;
  email: string;
  user_type: string;
  token: string;
  refresh_token: string;
  is_email_verified: boolean;
}
