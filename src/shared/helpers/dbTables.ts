export class Db {
  public static getSchemas() {
    return {
      userSchema: "user_module",
      productSchema: "product_module",
      serviceSchema: "service_module",
      ConfigSchema: "configuration_service",
    };
  }

  public static getTableNamesOnly() {
    return {};
  }

  public static getTables() {
    const { userSchema, ConfigSchema, productSchema, serviceSchema } = Db.getSchemas();
    const namesOnly = Db.getTableNamesOnly();
    return {
      usersTable: `${userSchema}.users`,
      usersTokenTable: `${userSchema}.user_token`,
      franchiseesTable: `${userSchema}.franchisees`,
      subFranchiseesTable: `${userSchema}.sub-franchisees`,
      creativesTable: `${userSchema}.creatives`,
      clientsTable: `${userSchema}.clients`,

      productCategoriesTable: `${productSchema}.product_categories`,
      productsTable: `${productSchema}.product`,
      productsBuyTable: `${productSchema}.products_buy`,
      productsBidTable: `${productSchema}.products_bid`,
      productsLeaseTable: `${productSchema}.products_lease`,
      productsReviewTable: `${productSchema}.product_review`,

      serviceCategoriesTable: `${serviceSchema}.service_categories`,
      serviceTable: `${serviceSchema}.service`,
    };
  }
}
