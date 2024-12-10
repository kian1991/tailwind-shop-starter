import { populateProductTable } from "../ui/product-table.js";

export class ProductsState {
  #products = [];

  constructor(products) {
    this.#setProducts(products);
  }

  deleteProductById(id) {
    const updatedProductList = this.#products.filter((p) => p.id !== id);
    this.#setProducts(updatedProductList);
  }

  updateProduct(updatedProduct) {
    const updatedProductList = this.#products.map((p) => {
      if (p.id === updatedProduct.id) {
        return updatedProduct;
      }
      return p;
    });

    this.#setProducts(updatedProductList);
  }

  addProduct(product) {
    // with state we always want to return a new object. (Thats why we dont use this.#products.push())
    this.#setProducts([...this.#products, product]);
  }

  setProducts(products) {
    this.#setProducts(products);
  }

  /**
   * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
   * @param {string} id productId
   * @returns found product or undefined
   */
  getProductById(id) {
    return this.#products.find((p) => p.id === id);
  }

  #setProducts(products) {
    this.#products = products;
    // only update table if we have 1 or more products
    if (products.length > 0) populateProductTable(products);
  }
}

export const productState = new ProductsState([]);
