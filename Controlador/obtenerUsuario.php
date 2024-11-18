<?php

require(__DIR__. '/../Modelo/modeloUsuarios.php');

$modeloUsuarios = new modeloUsuarios();

session_start();
$id = $_SESSION["usuario_id"];
echo "User ID: " . $id . "<br>"; // Print the user ID

// Get user data
$usuario = $modeloUsuarios->getUsuarios($id);

// Check if user data is not empty
if (!empty($usuario)) {
    // Print user details
    foreach ($usuario as $user) {
        echo "User Details:<br>";
        echo "ID: " . htmlspecialchars($user['id_usuario']) . "<br>";
        echo "Name: " . htmlspecialchars($user['nombre']) . "<br>"; // Change 'nombre' to the actual column name
        // Add other fields as needed
    }
} else {
    echo "No user found.";
}
?>
