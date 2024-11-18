<?php

require(__DIR__. '/../Modelo/modeloCoches.php');

$modeloCoches = new ModeloCoches();

$suspensiones = $modeloCoches->getSuspensiones();

header("Content-Type: application/json");
echo json_encode($suspensiones);


?>