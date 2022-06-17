import { DiscountStrategy } from "./discount-strategy";
import { ProductProtocol } from "./product-protocol";

export class ShoppingCart {
  private products: ProductProtocol[] = [];

  constructor(private readonly discountStrategy: DiscountStrategy) {}

  addProduct(...products: ProductProtocol[]) {
    products.forEach((product) => this.products.push(product));
  }

  getProducts(): ProductProtocol[] {
    return this.products;
  }

  getTotal(): number {
    return this.products.reduce((sum, product) => sum + product.price, 0);
  }

  getTotalWithDiscount(): number {
    return this.discountStrategy.getDiscount(this);
  }
}
