import "reflect-metadata";
import { Container } from "inversify";
///****DO NOT DELETE */
/**
 * Ensure all controllers are imported into this ioc file before your routes would function
 **/
import "../modules/Users/controllers/Users.controller";
import "../modules/Users/controllers/Admin.controller";
import "../modules/Users/controllers/Authentication.controller";
import "../modules/Countries/controllers/Countries.controller";
import "../modules/Upload/controllers/upload.controller";
import "../modules/Products/controllers/ProductCategories.controller";
import "../modules/Products/controllers/Product.controller";
import "../modules/Products/controllers/ProductBuy.controller";
import "../modules/Products/controllers/ProductBid.controller";
import "../modules/Products/controllers/ProductLease.controller";
import "../modules/Services/controllers/ServiceCategories.controller";
import "../modules/Services/controllers/Service.controller";
import "../modules/Products/controllers/ProductReview.controller";

import UsersService from "../modules/Users/services/Users.service";
import SERVICE_IDENTIFIERS, { REPOSITORIES } from "../shared/constants/identifiers";
import UsersRepository from "../modules/Users/repositories/users.repositories";
import JwtClient from "../shared/services/JWT";
import AuthenticationService from "../modules/Users/services/Auth.service";
import BcryptUtil from "../shared/services/Bcrypt";
import { MailService } from "../modules/Notifications/services/mail.service";
import UserTokenRepository from "@modules/Users/repositories/userToken.repositories";
import UserTokenService from "@modules/Users/services/UserToken.service";
import AdminService from "@modules/Users/services/Admin.service";
import getDecorators from "inversify-inject-decorators";
import FranchiseesRepository from "@modules/Users/repositories/franchisees.repositories";
import SubFranchiseesRepository from "@modules/Users/repositories/sub-franchisees.repositories";
import CreativesRepository from "@modules/Users/repositories/creatives.repositories";
import ClientsRepository from "@modules/Users/repositories/clients.repositories";
import FranchiseesService from "@modules/Users/services/Franchisee.service";
import CreativesService from "@modules/Users/services/Creatives.service";
import ClientsService from "@modules/Users/services/Clients.service";
import SubFranchiseeService from "@modules/Users/services/SubFranchise.service";
import ProductCategoryService from "@modules/Products/services/ProductCategories.service";
import ProductService from "@modules/Products/services/Product.service";
import ProductBuyService from "@modules/Products/services/ProductBuy.service";
import ProductBidService from "@modules/Products/services/ProductBid.service";
import ProductLeaseService from "@modules/Products/services/ProductLease.service";
import ServiceCategoryService from "@modules/Services/services/ServiceCategories.service";
import ServiceService from "@modules/Services/services/Service.service";
import ProductCategoryRepository from "@modules/Products/repositories/productCategories.repositories";
import ProductRepository from "@modules/Products/repositories/product.repositories";
import ProductBuyRepository from "@modules/Products/repositories/productBuy.repositories";
import ProductBidRepository from "@modules/Products/repositories/productBid.repositories";
import ProductLeaseRepository from "@modules/Products/repositories/productLease.repositories";
import ServiceCategoryRepository from "@modules/Services/repositories/serviceCategories.repositories";
import ServiceRepository from "@modules/Services/repositories/service.repositories";
import CountriesRepository from "@modules/Countries/repositories/countries.repositories";
import CountriesService from "@modules/Countries/services/Countries.service";
import ProductReviewsService from "@modules/Products/services/ProductReviews.service";
import ProductReviewsRepository from "@modules/Products/repositories/productReviews";

/*
 *
 *
 * */
const container = new Container();

export let { lazyInject } = getDecorators(container);

// set up bindings
//services
container.bind<UsersService>(SERVICE_IDENTIFIERS.USERS_SERVICE).to(UsersService).inSingletonScope();
container.bind<JwtClient>(SERVICE_IDENTIFIERS.JWT_SERVICE).to(JwtClient).inSingletonScope();
container.bind<BcryptUtil>(SERVICE_IDENTIFIERS.BCRYPT_SERVICE).to(BcryptUtil).inSingletonScope();
container.bind<AuthenticationService>(SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE).to(AuthenticationService).inSingletonScope();
container.bind<MailService>(SERVICE_IDENTIFIERS.MAIL_SERVICE).to(MailService).inSingletonScope();
container.bind<UserTokenService>(SERVICE_IDENTIFIERS.USER_TOKEN_SERVICE).to(UserTokenService).inSingletonScope();
container.bind<AdminService>(SERVICE_IDENTIFIERS.ADMIN_SERVICE).to(AdminService).inSingletonScope();
container.bind<FranchiseesService>(SERVICE_IDENTIFIERS.FRANCHISEE_SERVICE).to(FranchiseesService).inSingletonScope();
container.bind<CreativesService>(SERVICE_IDENTIFIERS.CREATIVES_SERVICE).to(CreativesService).inSingletonScope();
container.bind<CountriesService>(SERVICE_IDENTIFIERS.COUNTRIES_SERVICE).to(CountriesService).inSingletonScope();
container.bind<SubFranchiseeService>(SERVICE_IDENTIFIERS.SUB_FRANCHISEE_SERVICE).to(SubFranchiseeService).inSingletonScope();
container.bind<ClientsService>(SERVICE_IDENTIFIERS.CLIENTS_SERVICE).to(ClientsService).inSingletonScope();
container.bind<ProductCategoryService>(SERVICE_IDENTIFIERS.PRODUCT_CATEGORY_SERVICE).to(ProductCategoryService).inSingletonScope();
container.bind<ProductService>(SERVICE_IDENTIFIERS.PRODUCTS_SERVICE).to(ProductService).inSingletonScope();
container.bind<ProductBuyService>(SERVICE_IDENTIFIERS.PRODUCTS_BUY_SERVICE).to(ProductBuyService).inSingletonScope();
container.bind<ProductBidService>(SERVICE_IDENTIFIERS.PRODUCTS_BID_SERVICE).to(ProductBidService).inSingletonScope();
container.bind<ProductLeaseService>(SERVICE_IDENTIFIERS.PRODUCTS_LEASE_SERVICE).to(ProductLeaseService).inSingletonScope();
container.bind<ServiceCategoryService>(SERVICE_IDENTIFIERS.SERVICE_CATEGORY_SERVICE).to(ServiceCategoryService).inSingletonScope();
container.bind<ServiceService>(SERVICE_IDENTIFIERS.SERVICE_SERVICE).to(ServiceService).inSingletonScope();
container.bind<ProductReviewsService>(SERVICE_IDENTIFIERS.PRODUCTS_REVIEW_SERVICE).to(ProductReviewsService).inSingletonScope();

//repositories
container.bind<UserTokenRepository>(SERVICE_IDENTIFIERS.USERS_TOKEN_RESPOSITORY).to(UserTokenRepository).inSingletonScope();
container.bind<UsersRepository>(SERVICE_IDENTIFIERS.USERS_RESPOSITORY).to(UsersRepository).inSingletonScope();
container.bind<FranchiseesRepository>(REPOSITORIES.FRANCHISEES_RESPOSITORY).to(FranchiseesRepository).inSingletonScope();
container.bind<CountriesRepository>(REPOSITORIES.COUNTRIES_RESPOSITORY).to(CountriesRepository).inSingletonScope();
container.bind<SubFranchiseesRepository>(REPOSITORIES.SUB_FRANCHISEES_RESPOSITORY).to(SubFranchiseesRepository).inSingletonScope();
container.bind<CreativesRepository>(REPOSITORIES.CREATIVES_RESPOSITORY).to(CreativesRepository).inSingletonScope();
container.bind<ClientsRepository>(REPOSITORIES.CLIENTS_RESPOSITORY).to(ClientsRepository).inSingletonScope();
container.bind<ProductCategoryRepository>(SERVICE_IDENTIFIERS.PRODUCT_CATEGORY_RESPOSITORY).to(ProductCategoryRepository).inSingletonScope();
container.bind<ProductRepository>(REPOSITORIES.PRODUCTS_RESPOSITORY).to(ProductRepository).inSingletonScope();
container.bind<ProductBuyRepository>(REPOSITORIES.PRODUCTS_BUY_RESPOSITORY).to(ProductBuyRepository).inSingletonScope();
container.bind<ProductBidRepository>(REPOSITORIES.PRODUCTS_BID_RESPOSITORY).to(ProductBidRepository).inSingletonScope();
container.bind<ProductLeaseRepository>(REPOSITORIES.PRODUCTS_LEASE_RESPOSITORY).to(ProductLeaseRepository).inSingletonScope();
container.bind<ServiceCategoryRepository>(SERVICE_IDENTIFIERS.SERVICE_CATEGORY_RESPOSITORY).to(ServiceCategoryRepository).inSingletonScope();
container.bind<ServiceRepository>(REPOSITORIES.SERVICE_RESPOSITORY).to(ServiceRepository).inSingletonScope();
container.bind<ProductReviewsRepository>(SERVICE_IDENTIFIERS.PRODUCT_REVIEW_RESPOSITORY).to(ProductReviewsRepository).inSingletonScope();

export default container;
