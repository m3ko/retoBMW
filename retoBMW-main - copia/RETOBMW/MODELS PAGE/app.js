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
    
        const textoBusqueda = event.target.value.toLowerCase().replace(/\s+/g, '');
       
       
        const modelosFiltrados = modelos.filter(modelo => 
            modelo.nombre_modelo.toLowerCase().replace(/\s+/g, '').includes(textoBusqueda)
           
           
        );


        mostrarDatos(modelosFiltrados);
        
    });
    
}


