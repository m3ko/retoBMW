

window.onload=recibirModelos();

async function recibirModelos() {
    

const response = await fetch('../../Controlador/obtenerCarrito.php');
const modelos = await response.json();
console.log("holas");
var listaC = document.querySelector("#listaCarrito");

if(modelos.length==0){


    listaC.innerHTML=`
                <h1 style="text-align: center; line-height: 550px;">Aun no hay nada en el carrito!</h1>

            `;
    console.log("aa");

}
modelos.forEach((producto) => {
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

        listaC.innerHTML+=`
        <div class="row">
                    <div class="col-md-8">
                        <div class="cart-table">
                            <div class="cart-table-prd">
                                <div class="cart-table-prd-image"><a href="#"><img src="${producto.img}" class="img-fluid" alt=""></a></div>
                                <div class="cart-table-prd-name">
                                    <h2><a href="#">${producto.nombre_producto}</a></h2>
                                    <h2><a href="#">- ${ 
                                        producto.potencia} CV <br> - Kit Aerodinamico: ${producto.kit_aerodinamico}</a></h2>
                                </div>
                                <div class="cart-table-prd-qty"><span>cantidad:</span> <b>1</b></div>
                                <div class="cart-table-prd-price"><span>precio:</span> <b>${producto.precio_total}€</b></div>
                                <div class="cart-table-prd-action"> <a href="#" class="fa fa-trash" aria-hidden="true"></a> <a href="#" class="fa fa-pencil" aria-hidden="true"></a></div>
                            </div>
                            
                            <div class="total">TOTAL:${producto.precio_despues_descuento}</div>
                            <br><br>                            <div class="cart-table-total">
                                <div class="row">
                                    <button type="button" value="${producto.precio_despues_descuento}" class="btn btn-primary" onclick="tramitarVehiculo(${producto.id_producto_final})">Tramitar Vehiculo</button>
                           
                                </div>
                            </div>
                        </div>
                    </div>
                    
                       
                      </div>`;

   
    });

    
    
}   async function tramitarVehiculo(id){

        const idVehiculo = {
            id_producto_final: id 
        };
    
        fetch('../../Controlador/tramitarVehiculo.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idVehiculo)  // Enviar los datos en formato JSON
        })
        .then(response => response.text())  // Leer la respuesta como texto
        .then(data => {
            console.log('Respuesta del servidor:', data);  // Ver la respuesta completa
            try {
                const jsonData = JSON.parse(data);  // Intentar analizar el JSON
                if (jsonData.success) {
                    alert('Producto tramitado');
                    location.reload();
                } else {
                    alert('Hubo un error al tramitar el producto');
                }
            } catch (e) {
                console.error('Error al analizar el JSON:', e);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

        

    }
