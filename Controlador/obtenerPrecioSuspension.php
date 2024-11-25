<?php
require_once '../Modelo/connect.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $conn = Conectar::conexion();
    $query = $conn->prepare("SELECT precio FROM suspension WHERE id_suspension = ?");
    $query->bind_param("i", $id);

    if ($query->execute()) {
        $result = $query->get_result();
        if ($row = $result->fetch_assoc()) {
            echo json_encode($row['precio']);
        } else {
            echo json_encode(['error' => 'Suspensión no encontrada']);
        }
    } else {
        echo json_encode(['error' => 'Error al ejecutar la consulta']);
    }
    $conn->close();
} else {
    echo json_encode(['error' => 'ID no proporcionado']);
}
?>
