<?php

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_POST['id_motor'],$_POST['nombre_motor'], $_POST['caballos'], $_POST['cilindrada'], $_POST['precio'], $_POST['combustion'])
) {
   
    $id_motor = $_POST['id_motor'];
    $nombre_motor = $_POST['nombre_motor'];
    $caballos = $_POST['caballos'];
    $cilindrada = $_POST['cilindrada'];
    $precio = $_POST['precio'];
    $combustion = $_POST['combustion'];
    
  
    

    // Crear array de datos del motor
    $motorModifi = [
        "id_motor" => $id_motor,
        "nombre_motor" => $nombre_motor,
        "caballos" => $caballos,
        "cilindrada" => $cilindrada,
        "precio" => $precio,
        "combustion" => $combustion,
    ];
    //echo $suspensionModifi;

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();

    try {
      
        $con->modificar_motor($motorModifi);
        
        echo "Suspension modificada exitosamente";
        header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
         
    } catch (Exception $e) {
        echo "Error al crear la suspension: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear la suspension.";
}

