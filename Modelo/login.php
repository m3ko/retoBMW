<?php
session_start();
require_once 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT * FROM usuario WHERE usuario = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario_db = $result->fetch_assoc();
        if (password_verify($contrasena, $usuario_db['contrasena'])) {
            $_SESSION['usuario_id'] = $usuario_db['id_usuario'];
            $_SESSION['usuario_nombre'] = $usuario_db['nombre'];
            $_SESSION['usuario_rol'] = $usuario_db['rol'];
            header("Location: marketplace.php"); // Redirigir al marketplace
            exit();
        } else {
            $error = "Contraseña incorrecta.";
        }
    } else {
        $error = "El usuario no existe.";
    }
}
?>