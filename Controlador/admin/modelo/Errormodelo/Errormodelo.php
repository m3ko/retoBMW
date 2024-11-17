<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_modelo'])) {
    $id_modelo = $_GET['id_modelo'];
    $Errormodelo = [
        "id_modelo" => $id_modelo
    ];
    $con = new modeloAdmin();
    $resultado = $con->errormodelo_Producto($Errormodelo);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_modelo' en la solicitud."]);
}
?>
