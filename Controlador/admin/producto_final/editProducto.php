<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST
if (
    isset(  $_POST['id_producto_final'],$_POST['id_modelo'], $_POST['id_motor'], $_POST['id_suspension'], $_POST['id_kit'], $_POST['id_llanta'], $_POST['id_freno'], $_POST['id_llanta'], $_POST['precio_total'], $_POST['nombre_producto'], $_POST['cantidad'], $_POST['img'])
) {

    $id_producto_final = $_POST['id_producto_final'];
    $id_modelo = $_POST['id_modelo'];
    $id_motor = $_POST['id_motor'];
    $id_suspension = $_POST['id_suspension'];
    $id_kit = $_POST['id_kit'];
    $id_llanta = $_POST['id_llanta'];
    $id_kit = $_POST['id_freno'];
    $id_llanta = $_POST['id_llanta'];
    $precio_total = $_POST['precio_total'];
    $nombre_producto = $_POST['nombre_producto'];
    $cantidad = $_POST['cantidad'];
    $img = $_POST['img'];
    

    // Crear array de datos dela producto
    $producto = [
        "id_producto_final" => $id_producto_final,
        "id_modelo" => $id_modelo,
        "id_motor" => $id_motor,
        "id_suspension" => $id_suspension,
        "id_kit" => $id_kit,
        "id_llanta" => $id_llanta,
        "id_freno" => $id_freno,
        "precio_total" => $precio_total,
        "nombre_producto" => $nombre_producto,
        "cantidad" => $cantidad,
        "img" => $img
    ];

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();
    
    try {
        
        $con->modificar_producto_final($producto);
        echo "producto creada exitosamente";
      
         header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
    } catch (Exception $e) {
        echo "Error al crear la producto: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear la producto.";
}
