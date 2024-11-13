<?php

require(__DIR__. '/../Modelo/modeloCoches.php');

$modeloCoches = new ModeloCoches();

$llantas = $modeloCoches->getLlantas();

header("Content-Type: application/json");
echo json_encode($llantas);


?>