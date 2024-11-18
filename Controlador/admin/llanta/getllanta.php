<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$llantas = $con->getllantas();

header('Content-Type: application/json');


?>
