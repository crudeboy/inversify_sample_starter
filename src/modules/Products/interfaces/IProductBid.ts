export interface IProductBid {
  productId?: string;
  price?: number;
  duration?: string;
}

export interface IProductBidResponse {
  productId: string;
  price: number;
  duration: string;
}

export interface IUpdateProductBid {
  id: string;
  productId: string;
  price: number;
  duration: string;
}

export interface ICreateProductBid {
  productId: string;
  price: number;
  duration: string;
}
