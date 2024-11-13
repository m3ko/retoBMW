<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST
if (
    isset( $_POST['nombre_llanta'], $_POST['tipo'], $_POST['precio'], $_POST['oferta'])
) {

    $nombre_llanta = $_POST['nombre_llanta'];
    $tipo = $_POST['tipo'];
    $precio = $_POST['precio'];
    $oferta = $_POST['oferta'];
    

    // Crear array de datos dela llanta
    $llanta = [
        "nombre_llanta" => $nombre_llanta,
        "tipo" => $tipo,
        "precio" => $precio,
        "oferta" => $oferta,
    ];

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();
    
    try {
        
        $con->crearllanta($llanta);
        echo "llanta creada exitosamente";
      
         header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
    } catch (Exception $e) {
        echo "Error al crear la llanta: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear la llanta.";
}
