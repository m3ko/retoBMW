<?php

// Este código importa y requiere los archivos necesarios para el funcionamiento del controlador de usuarios



// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$motordel = $_GET['id_motor'];
$con = new modeloAdmin();
$con->eliminar_motor($motordel);


exit();
?>
