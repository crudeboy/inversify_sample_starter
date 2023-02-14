export interface IUser {
  full_name: string;
  password: string;
  address: string;
  country?: string;
  profession?: string;
  email: string;
  gender: string;
  user_type: string;
}

export interface IFranchisee {
  full_name: string;
  password: string;
  address: string;
  country?: string;
  profession?: string;
  email: string;
  gender?: string;
  user_type?: string;
}
