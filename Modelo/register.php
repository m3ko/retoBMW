<?php
session_start();
require_once 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $usuario = $_POST['usuario'];
    $email = $_POST['email'];
    $contrasena = password_hash($_POST['contrasena'], PASSWORD_BCRYPT); // Hashear la contraseña

    $sql = "INSERT INTO usuario (nombre, apellidos, usuario, email, contrasena) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssss', $nombre, $apellidos, $usuario, $email, $contrasena);
    
    if ($stmt->execute()) {
        header("Location: login.php"); // Redirigir a la página de login
        exit();
    } else {
        $error = "Error al registrar el usuario.";
    }
}
?>
