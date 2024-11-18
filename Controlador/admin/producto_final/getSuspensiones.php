<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$nombresuspension = $con->getSuspensiones_nombre($nombresuspension);

header('Content-Type: application/json');


?>
