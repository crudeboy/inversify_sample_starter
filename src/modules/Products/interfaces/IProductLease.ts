export interface IProductLease {
  productId?: string;
  price?: number;
  duration?: string;
}

export interface IProductLeaseResponse {
  productId: string;
  price: number;
  duration: string;
}

export interface IUpdateProductLease {
  id: string;
  productId: string;
  price: number;
  duration: string;
}

export interface ICreateProductLease {
  productId: string;
  price: number;
  duration: string;
}
