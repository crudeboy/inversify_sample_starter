export interface IServiceCategory {
  name: string;
  slug: string;
  description: string;
}

export interface IUpdatServiceCategory {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
}

export interface IServiceCategoryResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
}
