<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$kit = $con->getkit_aerodinamico();

header('Content-Type: application/json');


?>
