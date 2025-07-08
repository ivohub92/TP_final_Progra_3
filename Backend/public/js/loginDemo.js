async function autocompletarLogin() {
  try {
    const res = await fetch('/login/demo');
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById('correo').value = data.correo;
    document.getElementById('password').value = data.password;
  } catch (err) {
    console.error('Error al cargar usuario demo:', err);
    alert('No se pudo cargar el usuario demo');
  }
}
