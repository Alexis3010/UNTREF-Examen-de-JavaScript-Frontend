// Referencias a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)
const weatherTable = document.getElementById('weatherTable').getElementsByTagName('tbody')[0];
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Función para obtener parámetros GET de la URL (ciudad seleccionada)
function obtenerParametroGET(nombreParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombreParametro);
}
// Función para obtener información de clima de una ciudad desde localStorage
function obtenerInfoClima(ciudad) {
    const ciudades = JSON.parse(localStorage.getItem('ciudades')) || [];
    return ciudades.find(c => c.nombre === ciudad);
}

// Función para mostrar dinámicamente el clima de la ciudad seleccionada en la tabla
function mostrarClimaEnTabla(ciudad) {
    const infoClima = obtenerInfoClima(ciudad);

    if (infoClima) {
        const row = weatherTable.insertRow();
        row.insertCell(0).textContent = infoClima.nombre;
        row.insertCell(1).textContent = infoClima.temperatura;
        row.insertCell(2).textContent = infoClima.condicion;
    } else {
        console.error('No se encontró información para esta ciudad.');
    }
}

// Función para agregar una ciudad al historial en localStorage
function agregarCiudadAHistorial(ciudad) {
    let historial = JSON.parse(localStorage.getItem('historialConsultas')) || [];
    
    if (!historial.includes(ciudad)) {
        historial.push(ciudad);
        localStorage.setItem('historialConsultas', JSON.stringify(historial));
    }
}

// Función para actualizar el historial en el DOM desde localStorage
function actualizarHistorialEnDOM() {
    let historial = JSON.parse(localStorage.getItem('historialConsultas')) || [];
    historyList.innerHTML = '';

    historial.forEach(ciudad => {
        const li = document.createElement('li');
        li.textContent = ciudad;
        historyList.appendChild(li);
    });
}


// Función para vaciar el historial de consultas en localStorage y en el DOM
function vaciarHistorial() {
    localStorage.removeItem('historialConsultas');
    actualizarHistorialEnDOM();
}

// Obtener la ciudad seleccionada desde los parámetros GET y obtener su información de clima al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const ciudadSeleccionada = localStorage.getItem('ciudadSeleccionada');
    
    if (ciudadSeleccionada) {
        mostrarClimaEnTabla(ciudadSeleccionada);
        agregarCiudadAHistorial(ciudadSeleccionada);
        actualizarHistorialEnDOM();
    } else {
        alert('No se seleccionó ninguna ciudad. Redirigiendo...');
        window.location.href = 'index.html';
    }
});

// Manejar evento de clic en el botón de vaciar historial para eliminar todas las consultas anteriores
clearHistoryBtn.addEventListener('click', vaciarHistorial);
