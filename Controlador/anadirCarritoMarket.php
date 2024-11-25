<?php

use FTP\Connection;
header('Content-Type: application/json');
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Obtener los datos del producto enviados desde JavaScript
$datosProducto = json_decode(file_get_contents('php://input'), true);

// Verificar si los datos fueron recibidos correctamente
if ($datosProducto && isset($datosProducto['id_producto_final'])) {
    $id_producto_final = $datosProducto['id_producto_final'];

    require '../Modelo/connect.php';

    $conn = Conectar::conexion();
    session_start();
    $id_usuario = $_SESSION['usuario_id'];

    // Preparar y ejecutar la consulta para agregar el producto al carrito
    $query = $conn->prepare('INSERT INTO `carrito` (`id_usuario`, `id_producto_final`) VALUES (?, ?)');
    $query->bind_param("ii", $id_usuario, $id_producto_final);
    $query->execute();

    // Enviar una respuesta JSON
    $response = [
        'success' => true,
        'message' => 'Producto añadido al carrito'
    ];
    echo json_encode($response);
} else {
    // Enviar una respuesta de error si los datos no fueron recibidos correctamente
    echo json_encode(['success' => false, 'message' => 'Error al recibir los datos']);
}
?>