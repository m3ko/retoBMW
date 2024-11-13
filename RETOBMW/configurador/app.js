$(document).ready(function() {

    $('.color-choose input').on('click', function() {
      var headphonesColor = $(this).attr('data-image');
      $('.active').fadeOut(500).removeClass('active');
      $('.left-column img[data-image = ' + headphonesColor + ']').fadeIn(250).addClass('active');
      $(this).addClass('active');
    });
  });

  window.onload= function cargar(){

obtenerModelos();
  }





async function obtenerModelos() {
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const modelos = await response.json();

  console.log(modelos);

  var listaModelos = document.querySelector("#cars");

  modelos.forEach((modelo) => {
      listaModelos.innerHTML += `
      <option value="${modelo.id_modelo}">${modelo.nombre_modelo}</option>
      `;
  });
}

async function obtenerFrenos() {
  
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const frenos = await response.json();

}

async function obtenerKitAerodinamicos() {
  
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const kits = await response.json();

}

async function obtenerMotores() {
  
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const motores = await response.json();

}
async function obtenerLlantas() {
  
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const llantas = await response.json();

}
async function obtenerSuspensiones() {
  
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const suspension = await response.json();

}