<?php

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_POST['id_modelo'],$_POST['nombre_modelo'], $_POST['precio_base'])
) {
   
    $id_modelo = $_POST['id_modelo'];
    $nombre_modelo = $_POST['nombre_modelo'];
    $precio_base = $_POST['precio_base'];

    
  
    

    // Crear array de datos del motor
    $modelomodifi = [
        "id_modelo" => $id_modelo,
        "nombre_modelo" => $nombre_modelo,
        "precio_base" => $precio_base
    ];
    //echo $suspensionModifi;

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();

    try {
      
        $con->modificar_modelos($modelomodifi);
        
        echo "modelo modificado exitosamente";
        header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
         
    } catch (Exception $e) {
        echo "Error al crear  modelo: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear modelo.";
}

