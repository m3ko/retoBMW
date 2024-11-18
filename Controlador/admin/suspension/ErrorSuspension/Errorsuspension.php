<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_suspension'])) {
    $id_suspension = $_GET['id_suspension'];
    $suspensionError = [
        "id_suspension" => $id_suspension
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorSuspension_Producto($suspensionError);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_suspension' en la solicitud."]);
}
?>
