// ==========================================
// AUTENTICACIÓN CON GOOGLE
// ==========================================

function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `
        <img src="${data.picture}" alt="Profile" class="profile-picture">
        <span>Hola, ${data.name.split(' ')[0]}!</span>
        <button class="btn btn-sm btn-outline-light ms-2" onclick="logoutGoogle()">Salir</button>
    `;
    userInfoDiv.style.display = 'flex';
    const signInButton = document.querySelector('.g_id_signin');
    if (signInButton) {
        signInButton.style.display = 'none';
    }
    localStorage.setItem('userData', JSON.stringify(data));
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

function logoutGoogle() {
    google.accounts.id.disableAutoSelect();
    document.getElementById('user-info').style.display = 'none';
    const signInButton = document.querySelector('.g_id_signin');
    if (signInButton) {
        signInButton.style.display = 'block';
    }
    localStorage.removeItem('userData');
}

function verificarSesion() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const data = JSON.parse(userData);
        const userInfoDiv = document.getElementById('user-info');
        if (userInfoDiv) {
            userInfoDiv.innerHTML = `
                <img src="${data.picture}" alt="Profile" class="profile-picture">
                <span>Hola, ${data.name.split(' ')[0]}!</span>
                <button class="btn btn-sm btn-outline-light ms-2" onclick="logoutGoogle()">Salir</button>
            `;
            userInfoDiv.style.display = 'flex';
            const signInButton = document.querySelector('.g_id_signin');
            if (signInButton) {
                signInButton.style.display = 'none';
            }
        }
    }
}
