console.log("hola");
window.onload = obtenerModelos();
window.onload = obtenerMotores();
window.onload = obtenerFrenos();
//  $(document).ready(function() {

//     $('.color-choose input').on('click', function() {
//       var headphonesColor = $(this).attr('data-image');
//       $('.active').fadeOut(500).removeClass('active');
//       $('.left-column img[data-image = ' + headphonesColor + ']').fadeIn(250).addClass('active');
//       $(this).addClass('active');
//     });
//   });



async function obtenerModelos() {

  console.log("holA");
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  console.log(response);
  const modelos = await response.json();



  console.log(modelos);

  var listaModelos = document.querySelector("#cars");
  var imagen = document.querySelector("#img");

  modelos.forEach((modelos) => {
    listaModelos.innerHTML += `
      <option value="${modelos.id_modelo}">${modelos.nombre_modelo}</option>
      `;
    if(modelos.id_modelo==1){
      imagen.innerHTML = `<img data-image="red" class="active" src="${modelos.img}" alt="">
`;
    }
  });
  

}

async function imagenModelo() {
  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const modelos = await response.json();
  
  var select = document.querySelector("#cars").value;
  var imagen = document.querySelector("#img");
  modelos.forEach((modelos) => {

    if (modelos.id_modelo == select) {

      imagen.innerHTML = `<img data-image="red" class="active" src="${modelos.img}" alt="">
`;
    }
  });
}

async function obtenerFrenos() {
  
  const response = await fetch('../../Controlador/obtenerFrenosConfig.php');
  const frenos = await response.json();

  var botonesFrenos = document.querySelector("#frenos");
  
  frenos.forEach(freno => {
    
    botonesFrenos.innerHTML+=`<button>${freno.tipo}</button>`;

  });


}

async function obtenerKitAerodinamicos() {

  const response = await fetch('../../Controlador/obtenerKitAerodinamicosConfig.php');
  const kits = await response.json();

}

async function obtenerMotores() {

  const response = await fetch('../../Controlador/obtenerMotoresConfig.php');
  const motores = await response.json();

  var botonesMotores = document.querySelector("#motor");

  motores.forEach(motor => {

    botonesMotores.innerHTML += `<button>${motor.cilindrada}cc ${motor.caballos}cv</button>;`

  });


}
async function obtenerLlantas() {

  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const llantas = await response.json();

}
async function obtenerSuspensiones() {

  const response = await fetch('../../Controlador/obtenerModelosConfig.php');
  const suspension = await response.json();

}