<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$nombre_usuario = $con->getUsuario_nombre($nombre_usuario);

header('Content-Type: application/json');


?>
