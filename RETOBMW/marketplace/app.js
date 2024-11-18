
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
            "Kit Aerodinámico:", producto.kit_aerodinámico,
            "Llanta:", producto.llanta,
            "Freno:", producto.freno,
            "Nombre del Producto:", producto.nombre_producto,
            "Precio Total:", producto.precio_total,
            "Cantidad:", producto.cantidad,
            "Imagen:", producto.img);

        // Añadir la carta correspondiente a cada producto
        carta.innerHTML += `
            <figure class="card card--4">
                <img src="${producto.img}" alt="">
                <figcaption>
                    <span class="info">
                        <h6>${producto.nombre_producto}</h6>
                        <span>
                            <ul>
                                <li>${producto.motor} (${producto.potencia}CV)</li>
                                <li>Kit Aerodinámico: ${producto.kit_aerodinámico}</li>
                                <li>Suspension: ${producto.suspension}</li>
                                <li>Tipo Frenos: ${producto.freno}</li>
                                <li>LLantas: ${producto.llanta}</li>
                                <li>Total: ${producto.precio_total}€</li>
                                <br>
<<<<<<< HEAD
                                <button onclick="verificarInicioSesion_carrito(${producto.id_producto_final})">Añadir al Carrito</button>
=======
                                <button class="add-to-cart" onclick="verificarInicioSesion_carrito(${producto.id_producto_final})">Añadir al Carrito</button>
>>>>>>> ian


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
    });
}

<<<<<<< HEAD
async function verificarInicioSesion_carrito(producto){

    const response = await fetch('../../Modelo/verificar_sesion.php');
    const verificar = await response.json();

    if(verificar==true){

        aniadirCarrito(producto)
        
    }

}

=======
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


>>>>>>> ian
function aniadirCarrito(producto) {



}
<<<<<<< HEAD
=======
function config() {

window.location.href='../configurador/index.html';

}
>>>>>>> ian


