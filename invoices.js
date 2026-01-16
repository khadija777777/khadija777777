// ================================
// Sélection des éléments
// ================================
const invoiceForm = document.getElementById("invoiceForm");
const invoicesTable = document.getElementById("invoicesTable");

const clientInput = document.getElementById("clientName");
const orderInput = document.getElementById("orderId");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const searchInput = document.getElementById("search");

// ================================
// Données (localStorage)
// ================================
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let currentInvoices = [...invoices];

// ================================
// Afficher les factures
// ================================
function renderInvoices() {
  invoicesTable.innerHTML = "";

  currentInvoices.forEach(inv => {
    invoicesTable.innerHTML += `
      <tr>
        <td>${inv.id}</td>
        <td>${inv.client}</td>
        <td>${inv.orderId}</td>
        <td>${inv.amount}</td>
        <td>${inv.date}</td>
        <td>
          <button onclick="deleteInvoice(${inv.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ================================
// ✅ AJOUT FACTURE (CLÉ)
// ================================
invoiceForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const invoice = {
    id: Date.now(),
    client: clientInput.value,
    orderId: orderInput.value,
    amount: amountInput.value,
    date: dateInput.value
  };

  invoices.push(invoice);
  saveInvoices();
  invoiceForm.reset();
});

// ================================
// Supprimer facture
// ================================
function deleteInvoice(id) {
  if (confirm("Supprimer cette facture ?")) {
    invoices = invoices.filter(i => i.id !== id);
    saveInvoices();
  }
}

// ================================
// Recherche
// ================================
function filterInvoices() {
  const term = searchInput.value.toLowerCase();
  currentInvoices = invoices.filter(i =>
    i.client.toLowerCase().includes(term) ||
    String(i.orderId).includes(term)
  );
  renderInvoices();
}

// ================================
// Sauvegarde
// ================================
function saveInvoices() {
  localStorage.setItem("invoices", JSON.stringify(invoices));
  currentInvoices = [...invoices];
  renderInvoices();
}

// ================================
// Initialisation
// ================================
document.addEventListener("DOMContentLoaded", renderInvoices);
