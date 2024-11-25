<?php

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_POST['id_suspension'],$_POST['nombre_suspension'], $_POST['tipo'], $_POST['precio'], $_POST['oferta'])
) {
   
    $id_suspension = $_POST['id_suspension'];
    $nombre_suspension = $_POST['nombre_suspension'];
    $tipo = $_POST['tipo'];
    $precio = $_POST['precio'];
    $oferta = $_POST['oferta'];
    
  
    

    // Crear array de datos del usuario
    $suspensionModifi = [
        "id_suspension" => $id_suspension,
        "nombre_suspension" => $nombre_suspension,
        "tipo" => $tipo,
        "precio" => $precio,
        "oferta" => $oferta
    ];
    //echo $suspensionModifi;

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();

    try {
      
        $con->modificar_suspension($suspensionModifi);
        
        echo "Suspension modificada exitosamente";

         
    } catch (Exception $e) {
        echo "Error al crear la suspension: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear la suspension.";
}

