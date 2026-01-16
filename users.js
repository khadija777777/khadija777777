// ================================
// Sélection des éléments
// ================================
const usersTable = document.getElementById("usersTable");
const userForm = document.getElementById("userForm");
const idInput = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");

// ================================
// Données (localStorage)
// ================================
let users = JSON.parse(localStorage.getItem("users")) || [];

// ================================
// Afficher les users
// ================================
function renderUsers() {
  usersTable.innerHTML = "";

  users.forEach(user => {
    usersTable.innerHTML += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button onclick="editUser(${user.id})">Edit</button>
          <button onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ================================
// Afficher le formulaire
// ================================
function showForm() {
  userForm.style.display = "block";
  userForm.reset();
  idInput.value = "";
}

// ================================
// Ajouter / Modifier user
// ================================
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    id: idInput.value ? Number(idInput.value) : Date.now(),
    name: nameInput.value,
    email: emailInput.value,
    role: roleInput.value
  };

  if (idInput.value) {
    users = users.map(u => u.id === user.id ? user : u);
  } else {
    users.push(user);
  }

  saveUsers();
  userForm.style.display = "none";
});

// ================================
// Supprimer user
// ================================
function deleteUser(id) {
  if (confirm("Supprimer cet utilisateur ?")) {
    users = users.filter(u => u.id !== id);
    saveUsers();
  }
}

// ================================
// Modifier user
// ================================
function editUser(id) {
  const user = users.find(u => u.id === id);
  if (!user) return;

  idInput.value = user.id;
  nameInput.value = user.name;
  emailInput.value = user.email;
  roleInput.value = user.role;

  userForm.style.display = "block";
}

// ================================
// Sauvegarde
// ================================
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}

// ================================
// Initialisation
// ================================
document.addEventListener("DOMContentLoaded", renderUsers);
