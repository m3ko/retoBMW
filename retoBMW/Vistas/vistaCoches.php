<?php
require_once __DIR__ . '/vista.php';
class VistaCoches extends Vista
{

    public function tablamodelos($modelos)
    {
        echo '<table class="table">';
        echo '<thead>';
        echo '<tr>';
        echo '<th>Modelo</th>';
        echo '<th>imagen_url</th>';
        echo '<th>imagen</th>';
        echo '<th>Precio desde</th>';
        echo '</tr>';
        echo '</thead>';
        echo '<tbody>';
        foreach ($modelos as $modelo) {
            echo '<tr>';
            echo '<td>' . $modelo["nombre_modelo"] . '</td>';
            echo '<td>' . $modelo["imagen_url"] . '</td>';
            echo '<td>' . $modelo["imagen"] . '</td>';
            echo '<td>' . $modelo["precio_base"] . '</td>';
            echo '</tr>';
           
          
        }
        echo '</tbody>';
        echo '</table>';  
    
    }
    }
  

?>