<?php


require(__DIR__. '/../Modelo/modeloCoches.php');

$modeloCoches= new modeloCoches();


$productosFinales = $modeloCoches->getNomProdFinal();

header("Content-Type: application/json");
echo json_encode($productosFinales);

?>