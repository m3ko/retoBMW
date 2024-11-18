<?php

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_POST['id_freno'],$_POST['tipo'], $_POST['precio'], $_POST['oferta'])
) {
   
    $id_freno = $_POST['id_freno'];
    $tipo = $_POST['tipo'];
    $precio = $_POST['precio'];
    $oferta = $_POST['oferta'];

    
  
    

    // Crear array de datos del motor
    $frenomod = [
        "id_freno" => $id_freno,
        "tipo" => $tipo,
        "precio" => $precio,
        "oferta" => $oferta
    ];
    //echo $suspensionModifi;

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();

    try {
      
        $con->modificar_freno($frenomod);
        
        echo "modelo modificado exitosamente";
        header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
         
    } catch (Exception $e) {
        echo "Error al crear  modelo: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear modelo.";
}

