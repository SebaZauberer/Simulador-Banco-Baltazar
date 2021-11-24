//funcion para simular el metodo .ready() para cargar script cuando se cargue la pagina
const ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}
//El equivalente a $(document).ready()
ready(() => {
  //tomo las variables de la URL en un string
  let queryGet = window.location.search.substring(1);
  let listaUsuarios = obtenerLocalStorage('listaUsuariosLS');

  //funcion para seleccionar una variable especifica de lo URL
  const obtenerVariablesGET = (variable) => {
    let variablesGet = queryGet.split("&");

    for (let i = 0; i < variablesGet.length; i++) {
      let pair = variablesGet[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  //genero el objeto con los datos de un usuario segun el paramero "user" de la URL
  const usuarioActivo = listaUsuarios.find(item => item.rut == obtenerVariablesGET('user'));

  //Mostrar nombre
  document.querySelectorAll('.nombreUsuario').forEach(element => element.innerText = usuarioActivo.nombre);

  //Mostrar lista de cuentas por usuario
  //lista de cuentas en el sidebar
  let cuentasUsuarioSidebar = document.querySelector('#cuentasUsuarioSidebar');

  for (let cuentaUS of usuarioActivo.billetera) {
    let tagA = document.createElement('a');

    tagA.innerHTML = "Cuenta N° " + cuentaUS.numCuenta;
    tagA.href = `/dashboard.html?user=${usuarioActivo.rut}&cuenta=${cuentaUS.numCuenta}`;
    tagA.className = "collapse-item";

    cuentasUsuarioSidebar.appendChild(tagA);
  }

  //lista de las cards con las cuentas arriba del contenido
  let listaCardsCuentas = document.getElementById('listaCuentas');

  for (let cuentaUS of usuarioActivo.billetera) {
    let cardCuenta =
      `<div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-success shadow h-100 py-2">
      <a href="/dashboard.html?user=${usuarioActivo.rut}&cuenta=${cuentaUS.numCuenta}" class="btn text-left">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                Cuenta ${cuentaUS.tipoCuenta} <br> N°<span class="numero-cuenta">${cuentaUS.numCuenta}</span></div>
              <div class="h5 mb-0 font-weight-bold text-gray-800 saldoUsuario">$${cuentaUS.saldo}</div>
            </div>
            <div class="col-auto">
              <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>`;

    listaCardsCuentas.innerHTML += cardCuenta;
  }

  //muestro los datos de una de las cuentas según si el numero de cuenta es igual al de la variable 'cuenta' en la URL
  let numeroCuentaGET = usuarioActivo.billetera.find(item => item.numCuenta == obtenerVariablesGET('cuenta'));

//imprimir numero de cuenta
  document.querySelector('.numCuenta').innerText = numeroCuentaGET.numCuenta;
  
  //imprimir saldo de la cuenta
  document.querySelector('.saldoCuenta').innerText = '$'+numeroCuentaGET.saldo;
  
  //imprimir saldo del sobregiro d ela cuenta
  document.querySelector('.salsoSobregiroCuenta').innerText = '$'+numeroCuentaGET.sobregiro;


  /* script para manetener y cerrar sesión en el dashboard  */
  let contadorModal,
  contadorSegModal;

  //funcion para mostrar un modal cada 1 minuto para preguntar si se desea mantener la sesion abierta
  let iniciarSesion = () => {
    let contador;

    window.setTimeout(() => {
      //aquí utilizo la sintaxis de JQuery porque los modales de Bootstrap funcionan así
      $('#modalExtenderSesion').modal('show');

      contador = 30;
      let contadorModalCierreSesion = document.querySelector('.contador-modal-cerrar-sesion');

      contadorSegModal = window.setInterval(() => {
        contadorModalCierreSesion.innerText = contador;
        contador -= 1;
      }, 1000);

      //defino un setTimeOut para el modal, si no hay respuesta en 30 segundos se cierra la sesion automaticamente
      contadorModal = window.setTimeout(() => {
        window.location.href = '/login.html'
      }, (1000 * 31));//el modal dura 30 segundos
    }, (1000 * 180)); //la sesion dura 3 minutos
  }

  //funcion para reiniciar el tiempo de la sesion y así mantenerla activa
  let mantenerSesion = () => {
    clearInterval(contadorSegModal);
    clearTimeout(contadorModal);
    iniciarSesion();
  }

  //inicio el contador de tiempo de la sesión
  iniciarSesion();

  document.querySelector('#btnMantenerSesion').addEventListener('click', () => {
    mantenerSesion();
    $('#modalExtenderSesion').modal('hide');
  });
});