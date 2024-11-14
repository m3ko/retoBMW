<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$freno = $con->getfrenos();

header('Content-Type: application/json');


?>
