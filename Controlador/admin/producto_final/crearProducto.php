<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');


if (
    isset(
         $_POST['id_modelo'], 
         $_POST['id_motor'], 
         $_POST['id_suspension'], 
         $_POST['id_kit'], 
         $_POST['id_llanta'], 
         $_POST['id_freno'], 
         $_POST['nombre_producto'], 
         $_POST['cantidad'], 
         $_POST['id_descuento'], 
         $_POST['precio_total'], 
         $_POST['precio_despues_descuento'], 
        $_POST['img']
    )
) {
    // Recoger los valores de los parámetros GET
    $id_modelo = $_POST['id_modelo'];
    $id_motor = $_POST['id_motor'];
    $id_suspension = $_POST['id_suspension'];
    $id_kit = $_POST['id_kit'];
    $id_llanta = $_POST['id_llanta'];
    $id_freno = $_POST['id_freno'];
    $nombre_producto = $_POST['nombre_producto'];
    $cantidad = $_POST['cantidad'];
    $id_descuento = $_POST['id_descuento'];
    $precio_total = $_POST['precio_total'];
    $precio_despues_descuento =$_POST['precio_despues_descuento'];
    $img = $_POST['img'];

    // Crear array de datos del producto
    $productocrear = [
        "id_modelo" => $id_modelo,
        "id_motor" => $id_motor,
        "id_suspension" => $id_suspension,
        "id_kit" => $id_kit,
        "id_llanta" => $id_llanta,
        "id_freno" => $id_freno,
        "nombre_producto" => $nombre_producto,
        "cantidad" => $cantidad,
        "precio_total" => $precio_total,
        "id_descuento" => $id_descuento,
        "precio_despues_descuento" => $precio_despues_descuento,
        "img" => $img
    ];

    // Crear la conexión a la base de datos
    $con = new modeloAdmin();

    try {
        // Llamar al método para crear el producto
        $con->crearproducto_final($productocrear);
        
        // Redirigir después de crear el producto

        exit; // Asegurarse de que no haya más salida después de la redirección
    } catch (Exception $e) {
        // Capturar y mostrar errores
        echo "Error al crear el producto: " . $e->getMessage();
    }
} else {
    // Mensaje de error si faltan campos
    echo "Error: Faltan campos requeridos para crear el producto.";
}
?>
