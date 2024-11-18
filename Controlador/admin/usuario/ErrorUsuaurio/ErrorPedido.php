<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_usuario'])) {
    $id_usuario = $_GET['id_usuario'];
    $pedidoError = [
        "id_usuario" => $id_usuario
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorPedido_Usuario($pedidoError);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_usuario' en la solicitud."]);
}
?>
