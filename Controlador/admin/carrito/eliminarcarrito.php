<?php

// Este código importa y requiere los archivos necesarios para el funcionamiento del controlador de usuarios



// Requiere el archivo que contiene la clase Conexion
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

$id_carritodel = $_GET['id_carrito'];
$con = new modeloAdmin();
$con->eliminar_carrito($id_carritodel);


exit();
?>
