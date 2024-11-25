<?php
require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST
if (
    isset(  $_POST['id_usuario'], $_POST['id_producto_final'], $_POST['fecha_pedido'], $_POST['direccion_entrega'], $_POST['id_codigo'])
) {


    $id_usuario = $_POST['id_usuario'];
    $id_producto_final = $_POST['id_producto_final'];
    $fecha_pedido = $_POST['fecha_pedido'];
    $direccion_entrega = $_POST['direccion_entrega'];
    $id_codigo = $_POST['id_codigo'];
    

    // Crear array de datos dela llanta
    $pedido = [
       
        "id_usuario" => $id_usuario,
        "id_producto_final" => $id_producto_final,
        "fecha_pedido" => $fecha_pedido,
        "direccion_entrega" => $direccion_entrega,
        "id_codigo" => $id_codigo,
    ];

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();
    
    try {
        
        $con->crearpedido($pedido);
        echo "pedido creada exitosamente";
      
   
    } catch (Exception $e) {
        echo "Error al crear la pedido: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear la llanta.";
}
