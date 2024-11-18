<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$producto = $con->getproductos_finales();

header('Content-Type: application/json');


?>
