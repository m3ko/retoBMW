<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$nombrefreno = $con->getFrenos_nombre($nombrefreno);

header('Content-Type: application/json');


?>
