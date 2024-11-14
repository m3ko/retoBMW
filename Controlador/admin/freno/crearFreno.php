<?php

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_POST['tipo'], $_POST['precio'], $_POST['oferta'])
) {
   
    $tipo = $_POST['tipo'];
    $precio = $_POST['precio'];
    $oferta = $_POST['oferta'];

    
  
    

    // Crear array de datos del freno
    $frenomod = [
        "tipo" => $tipo,
        "precio" => $precio,
        "oferta" => $oferta
    ];
    //echo $suspensionModifi;

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();

    try {
      
        $con->crearfreno($frenomod);
        
        echo "freno modificado exitosamente";
        header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
         
    } catch (Exception $e) {
        echo "Error al crear  freno: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear freno.";
}

