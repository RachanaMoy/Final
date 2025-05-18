const productsContainer = document.getElementById("productsContainer");
let products = JSON.parse(localStorage.getItem("products")) || [];
function renderProducts() {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML =
      '<p class="text-center fs-5 text-secondary">No products available.</p>';
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
      <div class="product-name">${product.name}</div>
      <div class="product-price">$${product.price}</div>
      <div class="product-desc">${product.description}</div>
      <div>
        <button class="btn btn-warning btn-sm edit-btn" data-id="${product.id}">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${product.id}">Delete</button>
      </div>
    `;

    productsContainer.appendChild(productCard);
  });
  document
    .querySelectorAll(".edit-btn")
    .forEach((btn) => btn.addEventListener("click", handleEdit));

  document
    .querySelectorAll(".delete-btn")
    .forEach((btn) => btn.addEventListener("click", handleDelete));
}
function handleDelete(e) {
  const id = Number(e.target.dataset.id);
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter((p) => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}
function handleEdit(e) {
  const id = Number(e.target.dataset.id);
  // Save id to localStorage to edit later
  localStorage.setItem("editProductId", id);
  window.location.href = "index.html";
}
renderProducts();
