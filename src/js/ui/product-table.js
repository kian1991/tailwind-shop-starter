export async function populateProductTable(products) {
  let tableBodyHtml = "";

  // here we are using the for...of... Loop
  // 👉 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
  for (const product of products) {
    tableBodyHtml += `
  <tr class="border-b bg-white">
    <td class="px-6 py-4">${product.id}</td>
    <td class="px-6 py-4">${product.name}</td>
    <td class="truncate px-6 py-4">${product.description}</td>
    <td class="px-6 py-4">
      <button
        onclick="ProductService.deleteProductById(${product.id})"
        class="rounded border border-black/10 bg-slate-500/15 p-1 shadow hover:bg-slate-500/20"
      >
        <img
          draggable="false"
          class="size-5 stroke-slate-800"
          src="/src/assets/delete-icon.svg"
        />
      </button>
      <button
        onclick="editProduct(${product.id})"
        class="rounded border border-black/10 bg-slate-500/15 p-1 shadow hover:bg-slate-500/20"
      >
        <img
          draggable="false"
          class="size-5 stroke-slate-800"
          src="/src/assets/edit-icon.svg"
        />
      </button>
    </td>
  </tr>
  `;
  }

  document.querySelector("#product-table-body").innerHTML = tableBodyHtml;
}
