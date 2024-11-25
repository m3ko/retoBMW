<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST
if (
    isset( $_POST['id_llanta'],$_POST['nombre_llanta'], $_POST['tipo'], $_POST['precio'], $_POST['oferta'])
) {
    $id_llanta = $_POST['id_llanta'];
    $nombre_llanta = $_POST['nombre_llanta'];
    $tipo = $_POST['tipo'];
    $precio = $_POST['precio'];
    $oferta = $_POST['oferta'];
    

    // Crear array de datos dela llanta
    $llanta = [
        "id_llanta" =>  $id_llanta ,
        "nombre_llanta" => $nombre_llanta,
        "tipo" => $tipo,
        "precio" => $precio,
        "oferta" => $oferta,
    ];

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();
    
    try {
        $con->modificar_llantas($llanta);
        echo "Motor creada exitosamente";
      
     
    } catch (Exception $e) {
        echo "Error al crear el Motor: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear el Motor.";
}
