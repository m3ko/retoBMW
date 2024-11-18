<?php

require(__DIR__. '/../Modelo/modeloCoches.php');

$modeloCoches = new ModeloCoches();

$kitsAerodinamicos = $modeloCoches->getKitAerodinamico();

header("Content-Type: application/json");
echo json_encode($kitsAerodinamicos);


?>