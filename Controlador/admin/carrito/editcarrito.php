<?php

require(__DIR__ . '/../../../Modelo/modeloAdmin.php');

// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_POST['id_carrito'],$_POST['id_carrito'],$_POST['id_producto_final'])
) {
   
    $id_carrito = $_POST['id_carrito'];
    $id_usuario = $_POST['id_usuario'];
    $id_producto_final = $_POST['id_producto_final'];
   

    
  
    

    // Crear array de datos del motor
    $carritomdf = [
        "id_carrito" => $id_carrito,
       "id_usuario"=> $id_usuario,
        "id_producto_final" => $id_producto_final

    ];
    //echo $suspensionModifi;

    // Crear instancia del modelo y llamar al método de creación
    $con = new modeloAdmin();

    try {
      
        $con->modificar_carrito($carritomdf);
        
      
         
    } catch (Exception $e) {
        echo "Error al crear  descuento: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear modelo.";
}

