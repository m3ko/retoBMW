<?php


require(__DIR__. '/../Modelo/modeloUsuarios.php');

$modeloUsuarios = new modeloUsuarios();


$id = $_SESSION["usuario_id"];


$usuario = $modeloUsuarios->getUsuarios($id);

header("Content-Type: application/json");
echo json_encode($usuario);



?>