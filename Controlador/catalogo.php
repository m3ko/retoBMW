<?php

require(__DIR__. '/../Modelo/modeloCoches.php');
require(__DIR__.'/../Vistas/vista.php');
require(__DIR__.'/../Vistas/vistaCoches.php');

$modeloCoches= new modeloCoches();
$vista = new vista();
$vistaCoches = new vistaCoches();

$coches=$modeloCoches->getNomProdFinal();



$vista->inithtml();
$vistaCoches->tablaProdFinales($coches);
$vista->endhtml();

?>