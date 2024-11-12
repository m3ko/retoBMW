<?php
require_once 'connect.php';

class Register extends Conectar
{

    function registrar()
    {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $first_name = $_POST['first_name'];
            $last_name = $_POST['last_name'];
            $email = $_POST['email'];
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
            $con = Register::conexion();
            $sql = "INSERT INTO usuario (nombre, apellido, usuario, contrasena) VALUES (?, ?, ?, ?)";
            $stmt = $con->prepare($sql);
            $stmt->bind_param('ssss', $first_name, $last_name, $email, $password);

            if ($stmt->execute()) {
                header("Location: login.php");
            } else {
                echo "Error al registrar usuario.";
            }
        }
    }
}
