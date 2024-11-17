<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_llanta'])) {
    $id_llanta = $_GET['id_llanta'];
    $Errorllanta = [
        "id_llanta" => $id_llanta
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorllanta_Producto($Errorllanta);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_llanta' en la solicitud."]);
}
?>
