<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_codigo'])) {

    $id_codigo = $_GET['id_codigo'];

    $Errorcodigo = [
        "id_codigo" => $id_codigo
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorcodigo_Pedido($Errorcodigo);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_codigo' en la solicitud."]);
}
?>
