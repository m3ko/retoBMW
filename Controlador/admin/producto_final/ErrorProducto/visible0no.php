<?php

require(__DIR__ . '/../../../../Modelo/modeloAdmin.php');


// Validar que todos los campos requeridos están presentes en la solicitud POST

if (
    isset($_GET['id_producto_final'],$_GET['visibilidad'])
) {
   
    $id_producto_final = $_GET['id_producto_final'];
    $visibilidad = $_GET['visibilidad'];
 
    
  
    


    $visible = [
        "id_producto_final" => $id_producto_final,
        "visibilidad" => $visibilidad,
      
    ];

    $con = new modeloAdmin();

    try {
      
        $con->visible($visible);
        
       
     
         
    } catch (Exception $e) {
        echo "Error al crear la suspension: " . $e->getMessage();
    }
} else {
    echo "Error: Faltan campos requeridos para crear .";
}

