<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$codigo_descuento = $con->getID_Codigo_descuento($codigo_descuento);

header('Content-Type: application/json');


?>
