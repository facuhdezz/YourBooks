document.getElementById('cerrarSesion').addEventListener('click', () => {
    localStorage.removeItem('token');
})