<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$descuento = $con->getCodigo_descuento();

header('Content-Type: application/json');


?>
