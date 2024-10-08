// 1. Obtener referencia al formulario y al select de ciudades
const cityForm = document.getElementById('cityForm');
const selectCity = document.getElementById('selectCity');

// Función para cargar dinámicamente las opciones de ciudades desde datos.json usando fetch
function cargarOpcionesCiudades() {
    // Llamando al archivo usando fetch
    fetch('../public/datos.json')
        .then(response => response.json())
        .then(data => {
            // Almacenar los datos en localStorage para usarlos en clima.html
            localStorage.setItem('ciudades', JSON.stringify(data.ciudades));

            // Ciudades y opciones del select

            data.ciudades.forEach(ciudad => {
                const option = document.createElement('option');
                option.value = ciudad.nombre;
                option.textContent = ciudad.nombre;
                selectCity.appendChild(option);
            });
        })
        //Mensaje de error
        .catch(error => {
            console.error('Error al cargar las opciones de ciudades(datos.json).', error);
            alert('Error al cargar las opciones de ciudades.');
        });
}

// Evento de envío del formulario para redirigir a clima.html con la ciudad seleccionada
cityForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const ciudadSeleccionada = selectCity.value;
    
    if (ciudadSeleccionada) {
    localStorage.setItem('ciudadSeleccionada', ciudadSeleccionada);
    window.location.href = 'clima.html';
} else {
    alert('Por favor, selecciona una ciudad.');
}
});


document.addEventListener('DOMContentLoaded', cargarOpcionesCiudades);
