import ProductLeaseService from "@modules/Products/services/ProductLease.service";
import ProductBidService from "@modules/Products/services/ProductBid.service";
import ProductBuyService from "@modules/Products/services/ProductBuy.service";
import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import { ICreateProduct, IProduct, IProductResponse, IUpdateProduct } from "../interfaces/IProduct";
import SERVICE_IDENTIFIERS, { REPOSITORIES } from "@shared/constants/identifiers";
import ProductRepository from "../repositories/product.repositories";

@injectable()
export default class ProductService {
  @inject(REPOSITORIES.PRODUCTS_RESPOSITORY) private readonly productRepository: ProductRepository;
  @inject(SERVICE_IDENTIFIERS.PRODUCTS_BID_SERVICE) private readonly productBidService: ProductBidService;
  @inject(SERVICE_IDENTIFIERS.PRODUCTS_BUY_SERVICE) private readonly productBuyService: ProductBuyService;
  @inject(SERVICE_IDENTIFIERS.PRODUCTS_LEASE_SERVICE) private readonly productLeaseService: ProductLeaseService;

  public async createProduct(details: IProduct): Promise<ICreateProduct> {
    details.buy.toString() === "true" ? (details.buy = true) : (details.buy = false);
    details.bid.toString() === "true" ? (details.bid = true) : (details.bid = false);
    details.lease.toString() === "true" ? (details.lease = true) : (details.lease = false);

    const { imageUrl, name, categoryId, description, lease, buy, bid } = details;
    const product = await this.productRepository.create({ imageUrl, name, categoryId, description, lease, buy, bid });

    if (details.buy === true) {
      const { id: productId } = product;
      const { buyPrice: price } = details;
      await this.productBuyService.createProductBuy({ productId, price });
    }
    if (details.bid === true) {
      const { id: productId } = product;
      const { bidPrice: price, bidDuration: duration } = details;
      await this.productBidService.createProductBid({ productId, price, duration });
    }
    if (details.lease === true) {
      const { id: productId } = product;
      const { leasePrice: price, leasePeriod: duration } = details;
      await this.productLeaseService.createProductLease({ productId, price, duration });
    }

    return product;
  }

  public async getProductById(id: string): Promise<IProductResponse> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  public async getAllProducts(): Promise<IProductResponse[]> {
    const products = await this.productRepository.getAll();
    if (!products.length) {
      throw new AppError("Product not found", 404);
    }
    return products;
  }

  public async getAllPendingProducts(): Promise<IProductResponse[]> {
    const products = await this.productRepository.getAllPending();
    if (!products.length) {
      throw new AppError("Product not found", 404);
    }
    return products;
  }

  public async updateProductById(details: IUpdateProduct): Promise<IProductResponse> {
    const { id, ...updates } = details;
    const update_response = await this.productRepository.updateById(details);
    if (!update_response || !id) {
      throw new AppError("Could not update Product.", 400);
    }
    const product = await this.getProductById(id);
    return product;
  }

  public async deleteProductById(id: string): Promise<string> {
    const response = await this.productRepository.deleteById(id);
    if (!response) throw new AppError("Could not delete Product.", 400);
    return "Product Category successfully deleted";
  }
}
