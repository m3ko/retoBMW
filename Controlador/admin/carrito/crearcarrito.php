<?php

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_POST['id_usuario'], $_POST['id_producto_final'])
) {
   
    $id_usuario = $_POST['id_usuario'];
    $id_producto_final = $_POST['id_producto_final'];

    
  
    

    // Crear array de datos del freno
    $crearcarrito = [
        "id_usuario" => $id_usuario,
        "id_producto_final" => $id_producto_final
    ];
    //echo $suspensionModifi;

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();

    try {
      
        $con->crearcarrito($crearcarrito);
        
        echo "freno modificado exitosamente";
        header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
         
    } catch (Exception $e) {
        echo "Error al crear  freno: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear freno.";
}

