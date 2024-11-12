<?php
session_start();

header("Content-Type: application/json");

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(false); // Devuelve false si no hay sesión activa
} else {
    echo json_encode(true);  // Devuelve true si hay sesión activa
}
?>