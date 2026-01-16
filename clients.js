// ================================
// Sélection des éléments
// ================================
const clientsTable = document.getElementById("clientsTable");
const clientForm = document.getElementById("clientForm");
const idInput = document.getElementById("clientId");
const nameInput = document.getElementById("clientName");
const emailInput = document.getElementById("clientEmail");
const phoneInput = document.getElementById("clientPhone");
const addressInput = document.getElementById("clientAddress");
const searchInput = document.getElementById("search");

// ================================
// Données (localStorage)
// ================================
let clients = JSON.parse(localStorage.getItem("clients")) || [];
let currentClients = [...clients];

// ================================
// Afficher les clients
// ================================
function renderClients() {
  clientsTable.innerHTML = "";

  currentClients.forEach(c => {
    clientsTable.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.address}</td>
        <td>
          <button onclick="editClient(${c.id})">Edit</button>
          <button onclick="deleteClient(${c.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ================================
// AFFICHER LE FORMULAIRE (CORRIGÉ)
// ================================
function showForm() {
  clientForm.style.display = "block";
  clientForm.reset();
  idInput.value = "";
}

// ================================
// Ajouter / Modifier client
// ================================
clientForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const client = {
    id: idInput.value ? Number(idInput.value) : Date.now(),
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    address: addressInput.value
  };

  if (idInput.value) {
    clients = clients.map(c => c.id === client.id ? client : c);
  } else {
    clients.push(client);
  }

  saveClients();
  clientForm.style.display = "none";
});

// ================================
// Supprimer client
// ================================
function deleteClient(id) {
  if (confirm("Supprimer ce client ?")) {
    clients = clients.filter(c => c.id !== id);
    saveClients();
  }
}

// ================================
// Modifier client
// ================================
function editClient(id) {
  const client = clients.find(c => c.id === id);
  if (!client) return;

  idInput.value = client.id;
  nameInput.value = client.name;
  emailInput.value = client.email;
  phoneInput.value = client.phone;
  addressInput.value = client.address;

  clientForm.style.display = "block";
}

// ================================
// Recherche
// ================================
function filterClients() {
  const term = searchInput.value.toLowerCase();
  currentClients = clients.filter(c =>
    c.name.toLowerCase().includes(term) ||
    c.email.toLowerCase().includes(term)
  );
  renderClients();
}

// ================================
// Tri
// ================================
function sortBy(key) {
  currentClients.sort((a, b) =>
    a[key].toLowerCase().localeCompare(b[key].toLowerCase())
  );
  renderClients();
}

// ================================
// Sauvegarde
// ================================
function saveClients() {
  localStorage.setItem("clients", JSON.stringify(clients));
  currentClients = [...clients];
  renderClients();
}

// ================================
// Initialisation
// ================================
document.addEventListener("DOMContentLoaded", renderClients);
