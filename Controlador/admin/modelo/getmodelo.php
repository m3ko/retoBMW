<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$modelo = $con->getmodelos();

header('Content-Type: application/json');


?>
