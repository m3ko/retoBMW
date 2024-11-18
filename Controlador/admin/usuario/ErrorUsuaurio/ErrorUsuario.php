<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['usuario'])) {
    $usuario = $_GET['usuario'];
    $usuarioError = [
        "usuario" => $usuario
    ];
    $con = new modeloAdmin();
    $resultado = $con->ErrorUsuario($usuarioError);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'usuario' en la solicitud."]);
}
?>
