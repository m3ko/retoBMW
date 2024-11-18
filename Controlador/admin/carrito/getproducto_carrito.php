<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$producto_carrito = $con->getproducto_nombre_carrito($producto_carrito);

header('Content-Type: application/json');


?>
