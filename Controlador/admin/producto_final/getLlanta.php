<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$nombrellanta = $con->getLlantas_nombre($nombrellanta);

header('Content-Type: application/json');


?>
