<?php
error_reporting(0);

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$con = new modeloAdmin();


$nombreproducto = $con->getProducto_nombre($nombreproducto);

header('Content-Type: application/json');


?>
