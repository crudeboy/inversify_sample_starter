export interface IProduct {
  name: string;
  description: string;
  categoryId: string;
  stockQuantity?: number;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  bid: boolean;
  buy: boolean;
  lease: boolean;
  bidDuration?: string;
  leasePeriod?: string;
  bidPrice?: number;
  buyPrice?: number;
  leasePrice?: number;
}

export interface IProductResponse {
  name: string;
  description: string;
  categoryId: string;
  stockQuantity: number;
  imageUrl: string;
  videoUrl: string;
  audioUrl: string;
  bid?: boolean;
  buy?: boolean;
  lease?: boolean;
  bidDuration?: string;
  leasePeriod?: string;
  bidPrice?: number;
  buyPrice?: number;
  leasePrice?: number;
}

export interface IUpdateProduct {
  id: string;
  name?: string;
  description?: string;
  categoryId?: string;
  stockQuantity?: number;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  bid?: boolean;
  buy?: boolean;
  lease?: boolean;
  bidDuration?: string;
  leasePeriod?: string;
  bidPrice?: number;
  buyPrice?: number;
  leasePrice?: number;
  status?: string;
}

export interface ICreateProduct {
  id?: string;
  name: string;
  description: string;
  categoryId: string;
  bid?: boolean;
  buy?: boolean;
  lease?: boolean;
  bidPrice?: number;
  buyPrice?: number;
  leasePrice?: number;
  bidDuration?: string;
  leasePeriod?: string;
}
