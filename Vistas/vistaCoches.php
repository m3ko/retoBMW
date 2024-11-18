<?php

class VistaCoches
{


    public function tablaProdFinales($nomProdFinales)
    {


        echo '<table class="table">';
        echo '<thead>';
        echo '<tr>';
        echo '<th>Id</th>';
        echo '<th>Modelo</th>';
        echo '<th>Motor</th>';
        echo '<th>Suspension</th>';
        echo '<th>Kit Aerodinamico</th>';
        echo '<th>Llanta</th>';
        echo '<th>Freno</th>';
        echo '<th>Nombre Producto</th>';
        echo '<th>Precio Total</th>';
        echo '<th>cantidad</th>';
        echo '<th>img</th>';
        echo '</tr>';
        echo '</thead>';
        echo '<tbody>';
        foreach ($nomProdFinales as $coche) {
            echo '<tr>';
        echo '<td>'.$coche['id_producto_final'].'</td>';
        echo '<td>'.$coche['modelo'].'</td>';
        echo '<td>'.$coche['motor'].'</td>';
        echo '<td>'.$coche['suspension'].'</td>';
        echo '<td>'.$coche['kit_aerodinamico'].'</td>';
        echo '<td>'.$coche['llanta'].'</td>';
        echo '<td>'.$coche['freno'].'</td>';
        echo '<td>'.$coche['nombre_producto'].'</td>';
        echo '<td>'.$coche['precio_total'].'</td>';
        echo '<td>'.$coche['cantidad'].'</td>';
        echo '<td>'.$coche['img'].'</td>';
        echo '</tr>';
        }
        echo '<tr>' ;
        echo '<td>';
        echo '<a href="./../Controlador/aniadirArma.php">Añadir</a>';
        echo '</td>';
        echo'</tr>';

        echo '</tbody>';
        echo '</table>';
    }
}
?>