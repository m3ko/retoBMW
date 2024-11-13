<?php

require_once __DIR__ . '/../Modelo/modeloUsuarios.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? null;
    $nombre = $_POST['nombre'] ?? null;
    $apellido = $_POST['apellido'] ?? null;
    $direccion = $_POST['direccion'] ?? null;
    $email = $_POST['email'] ?? null;
    $contraseña = $_POST['password'] ?? null;


    if ($username && $nombre && $apellido && $email && $contraseña && $direccion) {

        $modeloUsuario = new modeloUsuarios();

        // Verificar si no hay otro mismo correo y contraseña
        if ($modeloUsuario->comprobarCredenciales($email, $contraseña)) {
            session_start();
           echo"alert error no puede tener el mismo correo y contraseña"
            exit;
        }
        // Validar credenciales para usuarios
        elseif ($modeloUsuario-> crearUsuario($username, $nombre, $apellido, $email, $contraseña, $direccion)) {
            session_start();
          
            exit;
        }
      
        else {
            header("Location: loginForm.php?error=invalid_credentials");
            exit;
        }
    } else {
        
        header("Location: loginForm.php?error=empty_fields");
        exit;
    }
} else {
  
    header("Location: loginForm.php");
    exit;
}
