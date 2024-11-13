<?php

require(__DIR__. '/../Modelo/modeloCoches.php');

$modeloCoches = new ModeloCoches();

$motores = $modeloCoches->getMotores();

header("Content-Type: application/json");
echo json_encode($motores);


?>