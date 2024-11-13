<?php

require_once __DIR__ . '/../Modelo/modeloUsuarios.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $email = $_POST['email'] ?? null;
    $contraseña = $_POST['password'] ?? null;


    if ($email && $contraseña) {

        $modeloUsuario = new modeloUsuarios();

        // Validar permisos de administrador
        if ($modeloUsuario->tienePermiso($email, $contraseña)) {
            session_start();
            $_SESSION['usuario_logueado'] = $email;
            echo "funciona";
            header("Location: ../RETOBMW/admin/index.html");
            exit;
        }
        // Validar credenciales para usuarios
        elseif ($modeloUsuario->iniciar_sesion($email, $contraseña)) {
            session_start();
            $_SESSION['usuario_logueado'] = $email;
            header("Location: ../RETOBMW/HOME PAGE/index.html");
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
