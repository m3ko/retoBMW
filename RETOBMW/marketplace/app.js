
window.onload = function cargarCartas() {
    obtenerProductosFinales(); // Cargar todos los productos al principio
}

// Función para el filtro
function filtro(modelo) {
    // Si el filtro es "todos", pasamos una cadena vacía para que se muestren todos los productos
    obtenerProductosFinales(modelo === 'todos' ? '' : modelo);
}

async function obtenerProductosFinales(modelo = '') {
    // Seleccionamos el contenedor de las cartas
    var carta = document.querySelector("#cartas");
    // Limpiar el contenido de las cartas antes de cargar nuevos resultados
    carta.innerHTML = '';

    const response = await fetch('../../Controlador/productosFinales.php');
    const productosFinales = await response.json();

    console.log(productosFinales);

    // Filtrar los productos si se ha proporcionado un modelo
    const productosFiltrados = modelo ? productosFinales.filter(producto => producto.modelo.includes(modelo)) : productosFinales;

    // Recorrer los productos filtrados y mostrarlos en el contenedor
    productosFiltrados.forEach((producto) => {
        console.log("ID:", producto.id_producto_final,
            "Modelo:", producto.modelo,
            "Motor:", producto.motor,
            "Potencia", producto.potencia,
            "Suspensión:", producto.suspension,
            "Kit Aerodinámico:", producto.kit_aerodinamico,
            "Llanta:", producto.llanta,
            "Freno:", producto.freno,
            "Nombre del Producto:", producto.nombre_producto,
            "Precio Total:", producto.precio_total,
            "Cantidad:", producto.cantidad,
            "Imagen:", producto.img,
            "id_descuento:", producto.id_descuento,
            "precio_despues_descuento", producto.precio_despues_descuento,
            "visibilidad", producto.visibilidad);
        // Añadir la carta correspondiente a cada producto

        if (producto.id_descuento == null && producto.visibilidad==1) {

            carta.innerHTML += `
            <figure class="card card--4">
                <img src="${producto.img}" alt="">
                <figcaption>
                    <span class="info">
                        <h6>${producto.nombre_producto}</h6>
                        <span>
                            <ul>
                                <li>${producto.motor} (${producto.potencia}CV)</li>
                                <li>Kit Aerodinámico: ${producto.kit_aerodinamico}</li>
                                <li>Suspension: ${producto.suspension}</li>
                                <li>Tipo Frenos: ${producto.freno}</li>
                                <li>LLantas: ${producto.llanta}</li>
                                <li>Total: ${producto.precio_total}€</li>
                                <br>
                                <button class="add-to-cart" onclick="verificarInicioSesion_carrito(${producto.id_producto_final})">Añadir al Carrito</button>


                            </ul>
                        </span>
                        </span>
                        // <nav class="opciones" >
                        //     <ul>
                        //         <li><a data-filter="todos" onclick="filtro('todos')">Añadir al Carrito</a></li>
                        //     </ul>
                        // </nav>
                </figcaption>
            </figure>`;
        } else if (producto.id_descuento == 1 && producto.visibilidad==1){

            carta.innerHTML += `
            <figure class="card card--4">
            
                <img src="${producto.img}" alt=""><img src="img/descuento.png" alt="" style=" max-height: 30px; margin-bottom:40px">
                
                <figcaption>
                    <span class="info">
                        <h6>${producto.nombre_producto}</h6>
                        <span>
                            <ul>
                                <li>${producto.motor} (${producto.potencia}CV)</li>
                                <li>Kit Aerodinámico: ${producto.kit_aerodinamico}</li>
                                <li>Suspension: ${producto.suspension}</li>
                                <li>Tipo Frenos: ${producto.freno}</li>
                                <li>LLantas: ${producto.llanta}</li>
                                <li>Total ANTES: ${producto.precio_total}€</li>
                                <li>Total DESPUÉS: ${producto.precio_despues_descuento}€</li>

                                
                                <button class="add-to-cart" onclick="verificarInicioSesion_carrito(${producto.id_producto_final})">Añadir al Carrito</button>


                            </ul>
                        </span>
                        </span>
                        // <nav class="opciones" >
                        //     <ul>
                        //         <li><a data-filter="todos" onclick="filtro('todos')">Añadir al Carrito</a></li>
                        //     </ul>
                        // </nav>
                </figcaption>
            </figure>`;


        }
    });
}

// Función para verificar inicio de sesión y añadir al carrito
async function verificarInicioSesion_carrito(producto) {
    const response = await fetch('../../Modelo/verificar_sesion.php');
    const verificar = await response.json();

    if (verificar) {
        aniadirCarrito(producto);

    } else {
        // Redirige a la página de inicio de sesión si no está autenticado
        window.location.href = '../Log In/index.html';
    }
}

async function verificarInicioSesion_config() {
    const response = await fetch('../../Modelo/verificar_sesion.php');
    const verificar = await response.json();

    if (verificar) {
        config();
    } else {
        // Redirige a la página de inicio de sesión si no está autenticado
        window.location.href = '../Log In/index.html';
    }
}


function aniadirCarrito(producto) {
    console.log(producto);

    const datosProducto = {
        id_producto_final: producto // Pasar directamente la variable 'producto'
    };

    fetch('../../Controlador/anadirCarritoMarket.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosProducto)  // Enviar los datos en formato JSON
    })
    .then(response => response.text())  // Leer la respuesta como texto
    .then(data => {
        console.log('Respuesta del servidor:', data);  // Ver la respuesta completa
        try {
            const jsonData = JSON.parse(data);  // Intentar analizar el JSON
            if (jsonData.success) {
                alert('Producto añadido al carrito');
            } else {
                alert('Hubo un error al añadir el producto');
            }
        } catch (e) {
            console.error('Error al analizar el JSON:', e);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function config() {

    window.location.href = '../configurador/index.html';

}


