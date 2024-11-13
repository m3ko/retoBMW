<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST
if (
    isset($_POST['nombre_motor'], $_POST['caballos'], $_POST['cilindrada'], $_POST['precio'], $_POST['combustion'])
) {
    $nombre_motor = $_POST['nombre_motor'];
    $caballos = $_POST['caballos'];
    $cilindrada = $_POST['cilindrada'];
    $precio = $_POST['precio'];
    $combustion = $_POST['combustion'];
    

    // Crear array de datos del motor
    $motor = [
        "nombre_motor" => $nombre_motor,
        "caballos" => $caballos,
        "cilindrada" => $cilindrada,
        "precio" => $precio,
        "combustion" => $combustion,
    ];

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();
    
    try {
        $con->crearMotor($motor);
        echo "Motor creada exitosamente";
      
         header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
    } catch (Exception $e) {
        echo "Error al crear el Motor: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear el Motor.";
}
