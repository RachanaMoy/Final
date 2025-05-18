const form = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productDesc = document.getElementById("productDesc");
const productCategory = document.getElementById("productCategory");
const productImage = document.getElementById("productImage");

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  if (productName.value.trim().length < 3) {
    productName.classList.add("is-invalid");
    isValid = false;
  } else {
    productName.classList.remove("is-invalid");
  }

  if (Number(productPrice.value) <= 0) {
    productPrice.classList.add("is-invalid");
    isValid = false;
  } else {
    productPrice.classList.remove("is-invalid");
  }

  if (productDesc.value.trim().length < 10) {
    productDesc.classList.add("is-invalid");
    isValid = false;
  } else {
    productDesc.classList.remove("is-invalid");
  }

  if (!productCategory.value) {
    productCategory.classList.add("is-invalid");
    isValid = false;
  } else {
    productCategory.classList.remove("is-invalid");
  }
  if (!isValidUrl(productImage.value.trim())) {
    productImage.classList.add("is-invalid");
    isValid = false;
  } else {
    productImage.classList.remove("is-invalid");
  }

  if (!isValid) return;

  const product = {
    id: Date.now(),
    name: productName.value.trim(),
    price: parseFloat(productPrice.value).toFixed(2),
    description: productDesc.value.trim(),
    category: productCategory.value,
    imageUrl: productImage.value.trim(),
  };

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  form.reset();

  alert("Product added successfully!");
});
