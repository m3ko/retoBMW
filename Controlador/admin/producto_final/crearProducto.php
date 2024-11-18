<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Imprimir los parámetros GET para depuración
echo '<pre>';
print_r($_GET);
echo '</pre>';

// Validar que todos los campos requeridos están presentes en la solicitud GET
if (
    isset(

        $_GET['id_modelo'], 
        $_GET['id_motor'], 
        $_GET['id_suspension'], 
        $_GET['id_llanta'], 
        $_GET['id_freno'], 
        $_GET['precio_total'], 
        $_GET['nombre_producto'], 
        $_GET['cantidad'], 
        $_GET['img']
    )
) {
    // Recoger los valores de los parámetros GET

    $id_modelo = $_GET['id_modelo'];
    $id_motor = $_GET['id_motor'];
    $id_suspension = $_GET['id_suspension'];
    $id_llanta = $_GET['id_llanta'];
    $id_freno = $_GET['id_freno'];
    $precio_total = $_GET['precio_total'];
    $nombre_producto = $_GET['nombre_producto'];
    $cantidad = $_GET['cantidad'];
    $img = $_GET['img'];

    // Crear array de datos del producto
    $producto = [

        "id_modelo" => $id_modelo,
        "id_motor" => $id_motor,
        "id_suspension" => $id_suspension,
        "id_llanta" => $id_llanta,
        "id_freno" => $id_freno,
        "precio_total" => $precio_total,
        "nombre_producto" => $nombre_producto,
        "cantidad" => $cantidad,
        "img" => $img
    ];

    // Imprimir los datos para depuración (opcional)

    echo "Modelo: $id_modelo<br>";
    echo "Motor: $id_motor<br>";
    echo "Suspensión: $id_suspension<br>";
    echo "Llanta: $id_llanta<br>";
    echo "Freno: $id_freno<br>";
    echo "Precio Total: $precio_total<br>";
    echo "Nombre Producto: $nombre_producto<br>";
    echo "Cantidad: $cantidad<br>";
    echo "Imagen: $img<br>";

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();
    
    try {
        $con->crearproducto_final($producto);
        // Redirigir después de crear el producto
        header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
        exit; // Asegurarse de que no haya más salida después de la redirección
    } catch (Exception $e) {
        echo "Error al crear el producto: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear el producto.";
}
?>