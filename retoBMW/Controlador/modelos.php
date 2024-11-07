<?php

// Habilitar la visualización de errores al inicio del archivo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../Modelo/modeloCoches.php'); // Verifica que la ruta sea correcta

// Crear una instancia de la clase modeloCoches
$con = new Model\modeloCoches();

// Obtener los modelos y almacenarlos en una variable
$modelos = $con->getModelos();

// Asegurarse de que el contenido es JSON
header("Content-Type: application/json");

// Verificar que el método getModelos() devuelva un JSON válido
if ($modelos !== false) {
    // Devolver los datos como JSON
    echo $modelos; // Ahora simplemente echo el resultado que devuelve getModelos()
} else {
    // Si hay un error, se puede devolver un mensaje de error en formato JSON
    echo json_encode(["error" => "No se pudieron obtener los modelos."]);
}
?>