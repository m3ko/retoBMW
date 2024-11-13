<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');
echo "hola";
if (
    isset($_POST['id_usuario'], $_POST['nombre'], $_POST['apellidos'], $_POST['usuario'], 
    $_POST['contrasena'], $_POST['email'], $_POST['direccion'], $_POST['rol'])
) {

    $id_usuario = $_POST['id_usuario'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];
    $email = $_POST['email'];
    $direccion = $_POST['direccion'];
    $rol = $_POST['rol'];

    $usuarioModifi = [
        'id_usuario' => $id_usuario,
        "nombre" => $nombre,
        "apellidos" => $apellidos,
        "usuario" => $usuario,
        "contrasena" => $contrasena,
        "email" => $email,
        "direccion" => $direccion,
        "rol" => $rol
    ];
    $con = new modeloAdmin();
    
    try {
        $con->modificar_usuario($usuarioModifi);
        echo "Usuario modificado exitosamente";
        header("Location: http://localhost/retoBMW-main/RETOBMW/admin/");
    } catch (Exception $e) {
        echo "Error al modificar el usuario: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para modificar el usuario.";
}
