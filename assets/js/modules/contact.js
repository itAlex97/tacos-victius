// ==========================================
// FORMULARIO DE CONTACTO CON EMAILJS
// ==========================================

function inicializarFormularioContacto() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const btnText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        const templateParams = {
            from_name: document.getElementById('from_name').value,
            reply_to: document.getElementById('reply_to').value,
            message: document.getElementById('message').value
        };
        
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: CONFIG.EMAILJS.SERVICE_ID,
                template_id: CONFIG.EMAILJS.TEMPLATE_ID,
                user_id: CONFIG.EMAILJS.PUBLIC_KEY,
                template_params: templateParams
            })
        })
        .then(response => {
            btn.textContent = btnText;
            btn.disabled = false;
            if (response.ok) {
                alert('¡Mensaje enviado con éxito!');
                contactForm.reset();
            } else {
                alert('Error al enviar el mensaje.');
            }
        })
        .catch(error => {
            btn.textContent = btnText;
            btn.disabled = false;
            alert('Error de red.');
        });
    });
}
