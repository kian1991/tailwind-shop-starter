// imports
import { ProductService } from "./services/products.js";
import { productState } from "./store/product-state.js";
import { injectAll } from "./util/injector.js";

async function initHomepage() {
  await injectAll();

  // initial product fetch
  const products = await ProductService.getProducts();
  if (!products) alert("Problem with fetching Products...please try again.");

  // products are loaded
  productState.setProducts(products);
}

initHomepage();

// Attach Eventlisteners
document.body.addEventListener("click", (event) => {
  // Check for buttons
  if (event.target.id === "btn-add")
    document.querySelector("#modal__new-product").showModal();
});

document.body.addEventListener("submit", async (event) => {
  // preventDefault, prevents the forms default behaviour i.e. sumitting to another page and redirecting
  const formElement = event.target; // Read here for explanation of currentTarget: https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget

  // Extract form values
  const formData = new FormData(formElement);

  const product = Object.fromEntries(formData.entries());

  // FormValidation should happen here! Not necessarry for now :)

  // Here differentiate between create and add product
  if (formElement.id === "form-add")
    await ProductService.createProduct(product);

  if (formElement.id === "form-edit")
    await ProductService.updateProduct(product.productId, product);

  // Empty the form
  formElement.reset();
});

window.editProduct = async function (id) {
  // show edit modal
  document.querySelector("#modal__edit-product").showModal();
  // get the product and insert values to the form.
  const product = productState.getProductById(id);

  document.querySelector("#form-edit #productId").value = product.id;

  document.querySelector("#form-edit #name").value = product.name;

  document.querySelector("#form-edit #description").value = product.description;

  document.querySelector("#form-edit #price").value = product.price;
};
