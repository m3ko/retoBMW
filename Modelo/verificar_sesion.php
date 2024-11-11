<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    header("Content-Type: application/json");
    echo json_encode([
        'status' => 'nologueado',
        'message' => 'reenviar a login',
    ]);
    
    header("Location: login.php"); // Redirigir si no hay sesión activa
    exit();
} else{

    $verificar = true;
    header("Content-Type: application/json");
    echo json_encode($verificar);
}
?>