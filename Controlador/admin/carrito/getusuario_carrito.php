<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$usuario_carrito = $con->getUsuario_carrito($usuario_carrito);

header('Content-Type: application/json');


?>
