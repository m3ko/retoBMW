<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$modelonombre = $con->getModelos_nombre();

header('Content-Type: application/json');


?>
