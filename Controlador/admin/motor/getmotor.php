<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$motores = $con->getmotores();

header('Content-Type: application/json');


?>
