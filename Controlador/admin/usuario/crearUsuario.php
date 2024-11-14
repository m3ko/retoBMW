<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST
if (
    isset($_POST['nombre'], $_POST['apellidos'], $_POST['usuario'], $_POST['contrasena'], 
    $_POST['email'], $_POST['direccion'], $_POST['rol'])
) {
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];
    $email = $_POST['email'];
    $direccion = $_POST['direccion'];
    $rol = $_POST['rol'];

    // Crear array de datos del usuario
    $usuarioData = [
        "nombre" => $nombre,
        "apellidos" => $apellidos,
        "usuario" => $usuario,
        "contrasena" => $contrasena,
        "email" => $email,
        "direccion" => $direccion,
        "rol" => $rol
    ];

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();
    
    try {
        echo $nombre;
        echo $apellidos;
        echo $usuario;
        echo $contrasena;
        echo $email;
        echo $direccion;
        echo $rol;
        $con->crearUsuario($usuarioData);
        echo "Usuario creado exitosamente";
      
         header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
    } catch (Exception $e) {
        echo "Error al crear el usuario: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear el usuario.";
}
