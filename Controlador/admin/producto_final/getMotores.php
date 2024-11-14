<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$nombremotor = $con->getMotores_nombre($nombremotor);

header('Content-Type: application/json');


?>
