<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$pedidos = $con->getpedidos();

header('Content-Type: application/json');


?>
