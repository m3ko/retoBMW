<?php

require(__DIR__. '/../Modelo/modeloCoches.php');

$modeloCoches = new ModeloCoches();

$frenos = $modeloCoches->getFrenos();

header("Content-Type: application/json");
echo json_encode($frenos);


?>