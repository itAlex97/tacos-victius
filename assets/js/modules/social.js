// ==========================================
// COMPARTIR EN REDES SOCIALES
// ==========================================

function compartirFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function compartirInstagram() {
    alert('📸 Para compartir en Instagram:\n1. Abre la app\n2. Menciona @tacosvictius\n3. Usa #TacosVictius');
}

function compartirTwitter() {
    const url = encodeURIComponent(window.location.href);
    const texto = encodeURIComponent('¡Los mejores tacos de Oaxaca! 🌮');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${texto}`, '_blank', 'width=600,height=400');
}
