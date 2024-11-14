<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$suspensiones = $con->getsuspensiones();

header('Content-Type: application/json');


?>
