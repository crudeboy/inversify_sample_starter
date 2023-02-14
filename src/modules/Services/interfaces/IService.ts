export interface IService {
  name: string;
  userId: string;
  categoryId: string;
  description: string;
  sampleUrl: string;
  rate: string;
  status: string;
}

export interface IUpdateService {
  id: string;
  name: string;
  userId: string;
  categoryId: string;
  description: string;
  sampleUrl: string;
  rate: string;
}

export interface IServiceResponse {
  name: string;
  userId: string;
  categoryId: string;
  description: string;
  sampleUrl: string;
  rate: string;
}

export interface ICreateService {
  name: string;
  userId: string;
  categoryId: string;
  description: string;
  sampleUrl: string;
  rate: string;
}
