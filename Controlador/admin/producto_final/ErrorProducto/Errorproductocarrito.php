<?php
require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');

if (isset($_GET['id_producto_final'])) {

    $id_producto_final = $_GET['id_producto_final'];

    $Errorcarrito_producto = [
        "id_producto_final" => $id_producto_final
    ];
    $con = new modeloAdmin();
    $resultado = $con->errorproducto_Carrito($Errorcarrito_producto);
    header("Content-Type: application/json");
    echo $resultado;
} else {
    header("Content-Type: application/json");
    echo json_encode(["error" => "Falta el campo 'id_producto_final' en la solicitud."]);
}
?>
