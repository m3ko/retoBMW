<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_kit'])) {

    $id_kit = $_GET['id_kit'];

    $Errorkit = [
        "id_kit" => $id_kit
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorkit_Producto($Errorkit);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_kit' en la solicitud."]);
}
?>
