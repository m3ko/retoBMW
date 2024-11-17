<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['email'])) {
    $email = $_GET['email'];
    $emailError = [
        "email" => $email
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorEmail($emailError);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'email' en la solicitud."]);
}
?>
