<?php

require(__DIR__. '/../Modelo/modeloUsuarios.php');
require(__DIR__. '/../Modelo/modeloCoches.php');

$modeloUsuarios = new modeloUsuarios();
$modeloCoches = new modeloCoches();

// Obtener los IDs de los coches del carrito
$coches = $modeloUsuarios->getCochesCarrito(); 


// Enviar la respuesta como JSON
header("Content-Type: application/json");
echo json_encode($coches);

?>