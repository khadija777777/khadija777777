// ================================
// INIT PRODUCTS (ONE TIME)
// ================================
if (!localStorage.getItem("products")) {
  const initialProducts = [
    { id: 1, name: "Rose Bouquet", price: 120, stock: 20 },
    { id: 2, name: "Tulip Flowers", price: 90, stock: 15 },
    { id: 3, name: "Lily White", price: 150, stock: 10 },
    { id: 4, name: "Orchid Pink", price: 200, stock: 8 },
    { id: 5, name: "Sunflower", price: 70, stock: 25 },
    { id: 6, name: "Daisy", price: 60, stock: 30 },
    { id: 7, name: "Jasmine", price: 110, stock: 12 },
    { id: 8, name: "Lavender", price: 95, stock: 18 },
    { id: 9, name: "Peony", price: 180, stock: 6 },
    { id: 10, name: "Mixed Flowers Box", price: 250, stock: 5 }
  ];
  localStorage.setItem("products", JSON.stringify(initialProducts));
}

// ================================
const table = document.getElementById("productsTable");
const form = document.getElementById("productForm");
const idInput = document.getElementById("productId");
const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const stockInput = document.getElementById("productStock");
const searchInput = document.getElementById("search");

let products = JSON.parse(localStorage.getItem("products")) || [];
let current = [...products];

// ================================
// 🌸 5 IMAGES SEULEMENT
// ================================
const flowerImages = [
  "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=80",
  "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&w=80",
  "https://images.pexels.com/photos/36753/flower-purple-lical-blosso.jpg?auto=compress&cs=tinysrgb&w=80",
  "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=80",
  "https://images.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg?auto=compress&cs=tinysrgb&w=80"
];

// ================================
function renderProducts() {
  table.innerHTML = "";

  current.forEach((p, index) => {
    const image = flowerImages[index % flowerImages.length];

    table.innerHTML += `
      <tr>
        <td>
          <img
            src="${image}"
            alt="Flower"
            style="width:80px; height:80px; border-radius:8px; object-fit:cover"
          >
        </td>
        <td>${p.name}</td>
        <td>${p.price} DH</td>
        <td>${p.stock}</td>
        <td>
          <button onclick="editProduct(${p.id})">Edit</button>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ================================
function showForm() {
  form.style.display = "block";
  form.reset();
  idInput.value = "";
}

// ================================
form.addEventListener("submit", e => {
  e.preventDefault();

  const product = {
    id: idInput.value ? Number(idInput.value) : Date.now(),
    name: nameInput.value,
    price: Number(priceInput.value),
    stock: Number(stockInput.value)
  };

  if (idInput.value) {
    products = products.map(p => p.id === product.id ? product : p);
  } else {
    products.push(product);
  }

  saveProducts();
  form.style.display = "none";
});

// ================================
function deleteProduct(id) {
  if (confirm("Delete product ?")) {
    products = products.filter(p => p.id !== id);
    saveProducts();
  }
}

// ================================
function editProduct(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;

  idInput.value = p.id;
  nameInput.value = p.name;
  priceInput.value = p.price;
  stockInput.value = p.stock;
  form.style.display = "block";
}

// ================================
function filterProducts() {
  const term = searchInput.value.toLowerCase();
  current = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts();
}

// ================================
function sortBy(key) {
  current.sort((a, b) => {
    if (key === "price" || key === "stock") return a[key] - b[key];
    return a[key].localeCompare(b[key]);
  });
  renderProducts();
}

// ================================
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
  current = [...products];
  renderProducts();
}

// ================================
document.addEventListener("DOMContentLoaded", renderProducts); 
// ================================
// 🌐 API EXTERNE : TAUX DE CHANGE (EUR → MAD)
// ================================
fetch("https://open.er-api.com/v6/latest/EUR")
  .then(response => response.json())
  .then(data => {
    console.log("Taux de change EUR → DH :", data.rates.MAD);
  })
  .catch(error => {
    console.error("Erreur API externe :", error);
  });


