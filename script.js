// Portafolio - Tito Hugo Montiel Lombana
// Autoría y derechos de autor: Tito Hugo Montiel Lombana
// Ajuste técnico: envío del formulario a Formspree para recibir mensajes por correo (sitio estático).

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : null;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }

    try {
      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        alert('✅ ¡Mensaje enviado! Gracias por contactarme.');
      } else {
        let data = null;
        try { data = await res.json(); } catch (_) {}
        const msg = (data && data.errors && data.errors.length)
          ? data.errors.map(e => e.message).join('\n')
          : 'No se pudo enviar el mensaje. Intenta de nuevo en unos segundos.';
        alert('⚠️ ' + msg);
      }
    } catch (err) {
      alert('⚠️ Error de red. Revisa tu conexión e inténtalo nuevamente.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText || 'Enviar';
      }
    }
  });
})();
