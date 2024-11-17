<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Imprimir los parámetros GET para depuración
<<<<<<< HEAD

=======
echo '<pre>';
print_r($_GET);
echo '</pre>';
>>>>>>> 7e7564fc80846d9298b73688f4ad4c2a8fcb58d8

// Validar que todos los campos requeridos están presentes en la solicitud GET
if (
    isset(

<<<<<<< HEAD
        $_POST['id_modelo'], 
        $_POST['id_motor'], 
        $_POST['id_suspension'], 
        $_POST['id_kit'], 
        $_POST['id_llanta'], 
        $_POST['id_freno'], 
        $_POST['precio_total'], 
        $_POST['nombre_producto'], 
        $_POST['cantidad'], 
        $_POST['img']
=======
        $_GET['id_modelo'], 
        $_GET['id_motor'], 
        $_GET['id_suspension'], 
        $_GET['id_kit'], 
        $_GET['id_llanta'], 
        $_GET['id_freno'], 
        $_GET['precio_total'], 
        $_GET['nombre_producto'], 
        $_GET['cantidad'], 
        $_GET['img']
>>>>>>> 7e7564fc80846d9298b73688f4ad4c2a8fcb58d8
    )
) {
    // Recoger los valores de los parámetros GET

<<<<<<< HEAD
    $id_modelo =  $_POST['id_modelo'];
    $id_motor =  $_POST['id_motor'];
    $id_suspension =  $_POST['id_suspension'];
    $id_kit =  $_POST['id_kit'];
    $id_llanta =  $_POST['id_llanta'];
    $id_freno =  $_POST['id_freno'];
    $precio_total =  $_POST['precio_total'];
    $nombre_producto =  $_POST['nombre_producto'];
    $cantidad =  $_POST['cantidad'];
    $img =  $_POST['img'];
=======
    $id_modelo = $_GET['id_modelo'];
    $id_motor = $_GET['id_motor'];
    $id_suspension = $_GET['id_suspension'];
    $id_kit = $_GET['id_kit'];
    $id_llanta = $_GET['id_llanta'];
    $id_freno = $_GET['id_freno'];
    $precio_total = $_GET['precio_total'];
    $nombre_producto = $_GET['nombre_producto'];
    $cantidad = $_GET['cantidad'];
    $img = $_GET['img'];
>>>>>>> 7e7564fc80846d9298b73688f4ad4c2a8fcb58d8

    // Crear array de datos del producto
    $producto = [

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
<<<<<<< HEAD
    echo $id_modelo;
    echo $id_motor;
    echo $id_suspension;
    echo $id_kit;
    echo $id_llanta;
    echo $id_freno;
    echo $precio_total;
    echo $nombre_producto;
    echo $cantidad;
    echo $img;
=======
>>>>>>> 7e7564fc80846d9298b73688f4ad4c2a8fcb58d8

   
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
