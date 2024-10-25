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
        echo '</tr>';
        echo '</thead>';
        echo '<tbody>';
        foreach ($nomProdFinales as $coche) {
            echo '<tr>';
        echo '<th>'+$coche['id']+'</th>';
        echo '<th>'+$coche['modelo']+'</th>';
        echo '<th>'+$coche['motor']+'</th>';
        echo '<th>'+$coche['suspension']+'</th>';
        echo '<th>'+$coche['kit_aerodinamico']+'</th>';
        echo '<th>'+$coche['llanta']+'</th>';
        echo '<th>'+$coche['freno']+'</th>';
        echo '<th>'+$coche['nombre_producto']+'</th>';
        echo '<th>'+$coche['precio_total']+'</th>';
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