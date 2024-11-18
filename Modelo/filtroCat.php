<?php

// Requiere el archivo que contiene la clase modeloCoches
require(__DIR__ . '/../Modelo/modeloCoches.php');

// Creamos una instancia de la clase modeloCoches
$con = new $modeloCoches();

// Obtiene el parámetro `serie` de la URL si está presente
$serie = isset($_GET['serie']) ? $_GET['serie'] : null;

// Obtenemos los modelos específicos según la serie solicitada
$modelos = $con->getModelosPorSerie($serie);

// Asegurarnos de que el contenido es JSON
header("Content-Type: application/json");

// Verificar que el método devuelve un JSON válido
if ($modelos !== false) {
    // Devolver los datos como JSON
    echo $modelos;
} else {
    // Si hay un error, se puede devolver un mensaje de error en formato JSON
    echo json_encode(["error" => "No se pudieron obtener los modelos."]);
}
?>