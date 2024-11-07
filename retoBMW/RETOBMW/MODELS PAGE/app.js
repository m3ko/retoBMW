let modelos = []; 

document.addEventListener("DOMContentLoaded", function() {
    cargardatos();
    configurarFiltros();
    configurarBuscador();
});


function cargardatos() {
    fetch("../../Controlador/modelos.php") 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            modelos = data; 
            mostrarDatos(modelos);
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}


function mostrarDatos(modelosFiltrados) {
    let rows = '';
    for (let modelo of modelosFiltrados) {
      
        let imagen = modelo.imagen_url ? modelo.imagen_url : 'ruta/a/imagen/por_defecto.png'; 
        rows += `
            <div class="carta">
                <button class="coche">
                    <img src="${imagen}" alt="${modelo.nombre_modelo}" width="100">
                    <p class="nombre">${modelo.nombre_modelo}</p>
                    <p class="precio">Desde ${modelo.precio_base}€</p>
                </button>
            </div>`;
    }


    let html = `
        <div class="modelos-list">
            ${rows}
        </div>
    `;

    document.getElementById('modelos-container').innerHTML = html; 
}


function cargarDatos(filtro) {
    let modelosFiltrados = modelos; 


    if (filtro && filtro !== 'todos') {
        modelosFiltrados = modelos.filter(modelo => modelo.nombre_modelo.includes(filtro));
    }

    mostrarDatos(modelosFiltrados);
}


function configurarFiltros() {
    const filtros = document.querySelectorAll(".filtro a"); 
    filtros.forEach(filtro => {
        filtro.addEventListener("click", (event) => {
            const valorFiltro = event.target.getAttribute("data-filter"); 
            cargarDatos(valorFiltro); 
        });
    });
}


function configurarBuscador() {
    const inputBuscar = document.getElementById("buscar");

    inputBuscar.addEventListener("input", (event) => {
        // Convierte el texto de búsqueda a minúsculas y elimina los espacios en blanco
        const textoBusqueda = event.target.value.toLowerCase().replace(/\s+/g, '');

        // Filtra los modelos que contengan el texto de búsqueda de forma más específica
        const modelosFiltrados = modelos.filter(modelo => {
            const nombreModeloSinEspacios = modelo.nombre_modelo.toLowerCase().replace(/\s+/g, '');

            // Si la búsqueda es una sola letra, filtramos por palabras que comiencen con esa letra
            if (textoBusqueda.length === 1) {
                return nombreModeloSinEspacios.startsWith(textoBusqueda);
            }

            // Si el texto de búsqueda es más largo, simplemente buscamos si está incluido
            return nombreModeloSinEspacios.includes(textoBusqueda);
        });

        // Muestra los modelos filtrados
        mostrarDatos(modelosFiltrados);
    });
}
function mostrarDatos(modelosFiltrados) {
    let rows = '';
    for (let modelo of modelosFiltrados) {
        let imagen = modelo.imagen_url ? modelo.imagen_url : 'ruta/a/imagen/por_defecto.png'; 
        rows += `
            <div class="carta">
                <button class="coche" onclick="verDetalles('${modelo.id_modelo}','${modelo.nombre_modelo}', '${modelo.precio_base}', '${imagen}')">
                    <img src="${imagen}" alt="${modelo.nombre_modelo}" width="100">
                    <p class="nombre">${modelo.nombre_modelo}</p>
                    <p class="precio">Desde ${modelo.precio_base}€</p>
                </button>
            </div>`;
    }

    let html = `
        <div class="modelos-list">
            ${rows}
        </div>
    `;

    document.getElementById('modelos-container').innerHTML = html; 
}


function verDetalles(idModelo, nombre, precio, imagen) {
    // Guardar los datos del coche en localStorage
    localStorage.setItem('id_modelo', idModelo);
    localStorage.setItem('nombre_modelo', nombre);
    localStorage.setItem('precio_base', precio);
    localStorage.setItem('imagen_url', imagen);

    // Redirigir a la página de detalles
    window.location.href = 'detalle.html';
}



