export interface IProductCategory {
  name: string;
  slug: string;
  description: string;
}

export interface IUpdatProductCategory {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
}

export interface IProductCategoryResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
}
