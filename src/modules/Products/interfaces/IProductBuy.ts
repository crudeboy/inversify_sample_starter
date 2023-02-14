export interface IProductBuy {
  productId?: string;
  price?: number;
}

export interface IProductBuyResponse {
  productId: string;
  price: number;
}

export interface IUpdateProductBuy {
  id: string;
  productId: string;
  price: number;
}

export interface ICreateProductBuy {
  productId: string;
  price: number;
}
