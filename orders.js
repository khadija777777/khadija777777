// ================================
// Sélection des éléments
// ================================
const ordersTable = document.getElementById("ordersTable");
const orderForm = document.getElementById("orderForm");

const clientInput = document.getElementById("orderClient");
const productInput = document.getElementById("orderProduct");
const quantityInput = document.getElementById("orderQuantity");
const priceInput = document.getElementById("orderPrice");

// ================================
// Données (localStorage)
// ================================
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// ================================
// Afficher les commandes
// ================================
function renderOrders() {
  if (!ordersTable) return;

  ordersTable.innerHTML = "";

  orders.forEach(o => {
    ordersTable.innerHTML += `
      <tr>
        <td>${o.client}</td>
        <td>${o.product}</td>
        <td>${o.quantity}</td>
        <td>${o.price}</td>
        <td>
          <button onclick="deleteOrder(${o.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ================================
// Ajouter une commande
// ================================
orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const order = {
    id: Date.now(),
    client: clientInput.value,
    product: productInput.value,
    quantity: Number(quantityInput.value),
    price: Number(priceInput.value),
    date: new Date().toISOString().split("T")[0]
  };

  orders.push(order);
  saveOrders();
  orderForm.reset();
});

// ================================
// Supprimer une commande
// ================================
function deleteOrder(id) {
  if (confirm("Supprimer cette commande ?")) {
    orders = orders.filter(o => o.id !== id);
    saveOrders();
  }
}

// ================================
// Sauvegarde dans localStorage
// ================================
function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

// ================================
// Initialisation
// ================================
document.addEventListener("DOMContentLoaded", renderOrders);
