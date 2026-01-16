// ================================
// LOGIN
// ================================
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Identifiants (exemple simple)
    if (username === 'khadija&nissrine_two_flowers' && password === 'khadijanissrine') {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('Identifiants invalides !');
    }
});


// ================================
// PROTECTION DES PAGES (Dashboard)
// ================================
function protect() {
    const isLoggedIn = localStorage.getItem('loggedIn');

    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Vérification automatique si la page a la classe "dashboard"
if (document.body.classList.contains('dashboard')) {
    protect();
}


// ================================
// LOGOUT
// ================================
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
}


// ================================
// (OPTIONNEL) BLOQUER RETOUR ARRIÈRE
// ================================
if (!localStorage.getItem('loggedIn')) {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
}

