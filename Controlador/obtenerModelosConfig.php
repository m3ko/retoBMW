<?php

require(__DIR__. '/../Modelo/modeloCoches.php');

$modeloCoches = new ModeloCoches();

$modelos = $modeloCoches->getModelos();

header("Content-Type: application/json");
echo json_encode($modelos);




?>