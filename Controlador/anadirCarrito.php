<?php
header('Content-Type: application/json');
require(__DIR__ . '/../Modelo/modeloCoches.php');
// Verificar el método de la solicitud
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos enviados en formato JSON
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);
    echo $datos;

    $modelo = $datos['modelo'];
    $configuraciones = $datos['configuraciones'];
    $precio = $datos['precio'];
    $vis = 0;
    require_once 'connect.php';
    $conn = Conectar::conexion();

    $query = "INSERT INTO carrito (id_modelo, id_freno, id_motor, id_kit, id_llanta, id_suspension, precio)
                  VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare(query: $query);
    $stmt->bind_param(
        "iiiiiiii",
        $modelo,
        $configuraciones['freno'],
        $configuraciones['motor'],
        $configuraciones['kit'],
        $configuraciones['llanta'],
        $configuraciones['suspension'],
        $precio,
        $vis

    );

    $stmt->execute();
}

//     // Verificar si se recibieron los datos necesarios
//     if (isset($datos['modelo'], $datos['configuraciones'], $datos['precio'])) {

//         echo $modelo, $configuraciones, $precio;
//         // Conexión a la base de datos (ajusta las credenciales según tu configuración)
//         

//         // Preparar consulta para añadir al carrito


//     $query = " INSERT INTO `producto_final`(`id_modelo`, `id_motor`, `id_suspension`, 
//     `id_kit`, `id_llanta`, `id_freno`, `precio_total`, `visibilidad`) VALUES (?,?,?,?,?,?,?,?)";
//         $stmt = $conn->prepare(query: $query);
//         $stmt->bind_param(
//             "iiiiiiii",
//             $modelo,
//             $configuraciones['freno'],
//             $configuraciones['motor'],
//             $configuraciones['kit'],
//             $configuraciones['llanta'],
//             $configuraciones['suspension'],
//             $precio,
//             $vis

//         );

//         // Ejecutar consulta
//         if ($stmt->execute()) {
//             echo json_encode(["mensaje" => "Producto añadido al carrito con éxito."]);
//         } else {
//             echo json_encode(["error" => "Error al insertar en la base de datos."]);
//         }

//         $stmt->close();
//         $conn->close();
//     } else {
//         echo json_encode(["error" => "Datos incompletos."]);
//     }
// } else {
//     echo json_encode(["error" => "Método no permitido."]);
// }
