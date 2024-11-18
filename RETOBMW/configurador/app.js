console.log("hola");
window.onload = obtenerModelos();
window.onload = obtenerMotores();
window.onload = obtenerFrenos();
window.onload = obtenerKitAerodinamicos();
window.onload = obtenerLlantas();
window.onload=obtenerSuspensiones();
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
    
    botonesFrenos.innerHTML+=`<button class="button" onclick="selectButton(this)" value="${freno.id_freno}">${freno.tipo}</button>`;

  });


}

async function obtenerKitAerodinamicos() {

  const response = await fetch('../../Controlador/obtenerKitAerodinamicosConfig.php');
  const kits = await response.json();

  var botonesKits = document.querySelector("#kits");

  kits.forEach(kit => {
    botonesKits.innerHTML+=`<button class="button" onclick="selectButton(this)" value="${kit.id_kit}">${kit.nombre_kit}</button>`;
  });
  
}

async function obtenerMotores() {

  const response = await fetch('../../Controlador/obtenerMotoresConfig.php');
  const motores = await response.json();

  var botonesMotores = document.querySelector("#motor");

  motores.forEach(motor => {

    botonesMotores.innerHTML += ` <button class="button" onclick="selectButton(this)" value="${motor.id_motor}"">${motor.cilindrada}cc ${motor.caballos}cv ${motor.combustion}</button>`

  });


}
async function obtenerLlantas() {

  const response = await fetch('../../Controlador/obtenerLlantasConfig.php');
  const llantas = await response.json();
  var botonesLlantas = document.querySelector("#llantas");

  llantas.forEach(llanta => {
    botonesLlantas.innerHTML += `<button class="button" onclick="selectButton(this)" value="${llanta.id_llanta}">${llanta.nombre_llanta}</button>`;
  });
}

async function obtenerSuspensiones() {

  const response = await fetch('../../Controlador/obtenerSuspensionesConfig.php');
  const suspensiones = await response.json();
  var botonesSuspensiones = document.querySelector("#suspensiones");

  suspensiones.forEach(suspension => {
    botonesSuspensiones.innerHTML += `<button class="button" onclick="selectButton(this)" value="${suspension.id_suspension}">${suspension.nombre_suspension}</button>`;
  });
}

function selectButton(button) {
  // Obtener la fila del botón seleccionado
  const row = button.parentNode;
  // Desmarcar todos los botones en la fila
  const buttons = row.getElementsByClassName('button');
  for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('selected');
  }
  // Marcar el botón seleccionado
  button.classList.add('selected');
}



