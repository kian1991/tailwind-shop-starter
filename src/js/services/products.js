import { productState } from "../store/product-state.js";
import { populateProductTable } from "../ui/product-table.js";

export class ProductService {
  static async getProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      const { data: products, error } = await response.json(); // here we unpack data and directly rename it to 'products'
      // Error Handling
      if (error) throw new Error(error); // Throw the string contained in { error: "Ouh Something went wrong..." }
      return products; // Here we have our unpacked array with products
    } catch (error) {
      // Now Backend errors are handled here in this catch!
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  }

  static async createProduct(newProduct) {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
          "x-api-key":
            "TE2FlPiHDhap9AC5CpwGJTK9IF5S8hBT7SyLLa3hhM1hYP9Gw9eCFevyjJ2pc/vqc6EErVNYSto7CWLPb78C1g==",
          "Content-Type": "application/json",
        },
      });
      const { data: createdProduct, error } = await response.json(); // here we unpack data and directly rename it to 'products'
      // Error Handling
      if (error) throw new Error(error); // Throw the string contained in { error: "Ouh Something went wrong..." }

      // add new product to state/ui
      productState.addProduct(createdProduct);
    } catch (error) {
      // Now Backend errors are handled here in this catch!
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  }
  static async updateProduct(productId, product) {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "PUT", // PUT - fully update a ressource as opposed to PATCH - partially update a ressource
          body: JSON.stringify(product),
          headers: {
            "x-api-key":
              "TE2FlPiHDhap9AC5CpwGJTK9IF5S8hBT7SyLLa3hhM1hYP9Gw9eCFevyjJ2pc/vqc6EErVNYSto7CWLPb78C1g==",
            "Content-Type": "application/json",
          },
        },
      );

      const { data: updatedProduct, error } = await response.json(); // here we unpack data and directly rename it to 'products'
      // Error Handling
      if (error) throw new Error(error); // Throw the string contained in { error: "Ouh Something went wrong..." }

      // update product in state/ui
      productState.updateProduct(updatedProduct);
    } catch (error) {
      // Now Backend errors are handled here in this catch!
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  }

  static async deleteProductById(id) {
    try {
      const userHasConfirmed = confirm(
        `You really want to delete Product #${id}?`,
      );

      if (userHasConfirmed === false) return; // We dont take action but return instantly

      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Response okay lets update the state! 🚀
        productState.deleteProductById(id);
        return; // we directly return because the response has no body to fetch
      }

      const { error } = await response.json(); // as we already checked for an ok response here we could possibly just have an error
      // Error Handling
      if (error) throw new Error(error); // Throw the string contained in { error: "Ouh Something went wrong..." }
    } catch (error) {
      // Now Backend errors are handled here in this catch!
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  }
}

window.ProductService = ProductService;
