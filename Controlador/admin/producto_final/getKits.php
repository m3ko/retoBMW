<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$nombrekit = $con->getKit_nombre($nombrekit);

header('Content-Type: application/json');


?>
