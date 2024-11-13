<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST
if (
    isset($_POST['nombre_suspension'], $_POST['tipo'], $_POST['precio'], $_POST['oferta'])
) {
    $nombre_suspension = $_POST['nombre_suspension'];
    $tipo =  $_POST['tipo'];
    $precio = $_POST['precio'];
    $oferta = $_POST['oferta'];
 
    

    // Crear array de datos del usuario
    $Suspension = [
        "nombre_suspension" => $nombre_suspension,
        "tipo" => $tipo,
        "precio" => $precio,
        "oferta" => $oferta
    ];

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();
    
    try {
        $con->crearSuspension($Suspension);
        echo "Suspension creada exitosamente";
      
         header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
    } catch (Exception $e) {
        echo "Error al crear el usuario: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear el usuario.";
}
