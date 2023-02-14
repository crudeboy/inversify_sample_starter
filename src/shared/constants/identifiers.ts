const SERVICE_IDENTIFIERS = {
  HEALTH_CONTROLLER: Symbol.for("HelloController"),
  USERS_SERVICE: Symbol.for("UsersService"),
  BCRYPT_SERVICE: Symbol.for("BcryptUtil"),
  JWT_SERVICE: Symbol.for("JwtClient"),
  AUTHENTICATION_SERVICE: Symbol.for("AuthenticationService"),
  MAIL_SERVICE: Symbol.for("MailService"),
  USER_TOKEN_SERVICE: Symbol.for("UserTokenService"),
  ADMIN_SERVICE: Symbol.for("AdminService"),
  FRANCHISEE_SERVICE: Symbol.for("FranchiseesService"),
  SUB_FRANCHISEE_SERVICE: Symbol.for("SubFranchiseeService"),
  CREATIVES_SERVICE: Symbol.for("CreativesService"),
  CLIENTS_SERVICE: Symbol.for("ClientsService"),
  PRODUCT_CATEGORY_SERVICE: Symbol.for("ProductCategoryService"),
  PRODUCTS_SERVICE: Symbol.for("ProductService"),
  PRODUCTS_BUY_SERVICE: Symbol.for("ProductBuyService"),
  PRODUCTS_BID_SERVICE: Symbol.for("ProductBidService"),
  PRODUCTS_LEASE_SERVICE: Symbol.for("ProductLeaseService"),
  SERVICE_CATEGORY_SERVICE: Symbol.for("ServiceCategoryService"),
  SERVICE_SERVICE: Symbol.for("ServiceService"),
  COUNTRIES_SERVICE: Symbol.for("countriesService"),
  PRODUCTS_REVIEW_SERVICE: Symbol.for("ProductReviewsService"),

  //REPOSITORIES
  USERS_RESPOSITORY: Symbol.for("UsersRepository"),
  USERS_TOKEN_RESPOSITORY: Symbol.for("UserTokenRepository"),
  PRODUCT_CATEGORY_RESPOSITORY: Symbol.for("ProductCategoryRepository"),
  SERVICE_CATEGORY_RESPOSITORY: Symbol.for("ServiceCategoryRepository"),
  PRODUCT_REVIEW_RESPOSITORY: Symbol.for("ProductReviewsRepository"),
};

export const REPOSITORIES = {
  FRANCHISEES_RESPOSITORY: Symbol.for("FranchiseesRepository"),
  SUB_FRANCHISEES_RESPOSITORY: Symbol.for("SubFranchiseesRepository"),
  CREATIVES_RESPOSITORY: Symbol.for("CreativesRepository"),
  CLIENTS_RESPOSITORY: Symbol.for("ClientsRepository"),
  COUNTRIES_RESPOSITORY: Symbol.for("CountriesRepository"),
  PRODUCTS_RESPOSITORY: Symbol.for("ProductsRepository"),
  PRODUCTS_BUY_RESPOSITORY: Symbol.for("ProductsBuyRepository"),
  PRODUCTS_BID_RESPOSITORY: Symbol.for("ProductsBidRepository"),
  PRODUCTS_LEASE_RESPOSITORY: Symbol.for("ProductsLeaseRepository"),
  SERVICE_RESPOSITORY: Symbol.for("ServiceRepository"),
};

export default SERVICE_IDENTIFIERS;
