<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$carritos = $con->getCarritos();

header('Content-Type: application/json');


?>
