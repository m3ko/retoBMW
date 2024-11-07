<?php
// Mostrar errores en modo de desarrollo (para depuración únicamente)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Requiere la clase modeloCoches
require_once __DIR__ . '/../Modelo/modeloCoches.php';

header("Content-Type: application/json");

// Verifica que el parámetro 'id_modelo' está presente
if (!isset($_GET['id_modelo'])) {
    echo json_encode(["error" => "El parámetro id_modelo es obligatorio."]);
    exit;
}

$id_modelo = intval($_GET['id_modelo']);  // Sanitiza el valor recibido
$con = new Model\modeloCoches();

// Intenta obtener los motores y maneja posibles errores
try {
    $motores = $con->getModelos_motor($id_modelo);
    echo json_encode($motores);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al obtener los datos de los motores"]);
}

?>