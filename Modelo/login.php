<?php
session_start();
require_once 'connect.php';

$login = new Login();
$login->iniciarSesion();

class Login extends Conectar
{

    public function iniciarSesion()
    {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $usuario = $_POST['usuario'];
            $contrasena = $_POST['contrasena'];
            $con = Login::conexion();

            $sql = "SELECT * FROM usuario WHERE usuario = ?";

            $stmt = $con->prepare($sql);
            $stmt->bind_param('s', $usuario);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $usuario_db = $result->fetch_assoc();
                if (password_verify($contrasena, $usuario_db['contrasena'])) {
                    $_SESSION['usuario_id'] = $usuario_db['id_usuario'];
                    $_SESSION['usuario_nombre'] = $usuario_db['nombre'];
                    $_SESSION['usuario_rol'] = $usuario_db['rol'];
                    header("Location: ../RETOBMW/marketplace/index.html");
                    exit();
                } else {
                    $error = "Contraseña incorrecta.";
                }
            } else {
                $error = "El usuario no existe.";
            }
        }
    }
}
