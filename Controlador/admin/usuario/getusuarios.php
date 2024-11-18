<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();

// Llamada a la función getUsuarios() para obtener los usuarios
$usuarios = $con->getUsuarios();

header('Content-Type: application/json');


?>
