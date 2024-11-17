<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_freno'])) {

    $id_freno = $_GET['id_freno'];

    $Errorfreno = [
        "id_freno" => $id_freno
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorfreno_Producto($Errorfreno);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_freno' en la solicitud."]);
}
?>
