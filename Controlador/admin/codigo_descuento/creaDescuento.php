<?php

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_POST['id_codigo'],$_POST['descuento_porcentaje'])
) {
   
    $id_codigo = $_POST['id_codigo'];
    $descuento_porcentaje = $_POST['descuento_porcentaje'];


    
  
    

    // Crear array de datos del motor
    $descuento = [
        "id_codigo" => $id_codigo,
        "descuento_porcentaje" => $descuento_porcentaje

    ];
    //echo $suspensionModifi;

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();

    try {
      
        $con->creardescuento($descuento);
        
        header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
         
    } catch (Exception $e) {
        echo "Error al crear  descuento: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear modelo.";
}

