<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_motor'])) {
    $id_motor = $_GET['id_motor'];
    $ErrorMotor = [
        "id_motor" => $id_motor
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorMotor_Producto($ErrorMotor);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_motor' en la solicitud."]);
}
?>
