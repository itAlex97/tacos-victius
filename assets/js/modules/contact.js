// ==========================================
// FORMULARIO DE CONTACTO (Solo DOM)
// ==========================================
// La lógica de envío está en el backend

function inicializarFormularioContacto() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const btnText = btn.textContent;
        btn.textContent = 'Enviando...';
        btn.disabled = true;

        const formData = {
            from_name: document.getElementById('from_name').value,
            reply_to: document.getElementById('reply_to').value,
            message: document.getElementById('message').value
        };
        
        try {
            const response = await fetch(`${CONFIG.API_URL}/utils/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert('✅ ¡Mensaje enviado con éxito!');
                contactForm.reset();
            } else {
                alert('❌ ' + (data.message || 'Error al enviar el mensaje'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Error de conexión. Intenta nuevamente.');
        } finally {
            btn.textContent = btnText;
            btn.disabled = false;
        }
    });
}
