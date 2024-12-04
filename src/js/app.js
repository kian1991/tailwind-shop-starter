/**
 * Injects HTML from a file into an element
 * @param {string} htmlFile - The path to the HTML file
 * @param {string} element - The element to inject the HTML into
 * @returns {Promise<void>}
 * @example
 * injectHTML('path/to/file.html', '.element')
 */
function injectHTML(htmlFile, element) {
  return fetch(htmlFile)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(element).innerHTML = data;
    })
    .then(() => console.log(`Injected ${htmlFile} into ${element}`));
}

// Inject the header
async function injectAll() {
  await injectHTML("components/header/header.html", "#header");
  await injectHTML("components/stats/stats.html", "#stats");
  await injectHTML("components/products/products.html", "#products");
  await injectHTML("components/modals/new-product.html", "#modal__new-product");
  await injectHTML(
    "components/modals/edit-product.html",
    "#modal__edit-product",
  );
}

injectAll();
