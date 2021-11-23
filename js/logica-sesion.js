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
  let usuarioActivo = listaUsuarios.find(item => item.rut == obtenerVariablesGET('user'));

  //Mostrar saldo
  document.querySelectorAll('.saldoUsuario').forEach(element => element.innerText = '$' + usuarioActivo.billetera[0].saldo);

  //Mostrar nombre
  document.querySelectorAll('.nombreUsuario').forEach(element => element.innerText = usuarioActivo.nombre);

  //Mostrar lista de cuentas por usuario
  //lista de cuentas en el sidebar
  let cuentasUsuarioSidebar = document.querySelector('#cuentasUsuarioSidebar');

  for (let cuentaUS of usuarioActivo.billetera){
    let tagA = document.createElement('a');

    tagA.innerHTML = "Cuenta N° "+cuentaUS.numCuenta;
    tagA.href = `/dashboard.html?user=${usuarioActivo.rut}&cuenta=${cuentaUS.numCuenta}`;
    tagA.className = "collapse-item";

    cuentasUsuarioSidebar.appendChild(tagA);
  }














  //scripts para manetener y cerrar sesión en el dashboard
  let contadorModal;
  let contadorSegModal;

  //funcion para mostrar un modal cada 1 minuto para preguntar si se desea mantener la sesion abierta
  let iniciarSesion = () => {
    let contador;

    window.setTimeout(() => {
      //aquí utilizo la sintaxis de JQuery porque los modales de Bootstrap funcionan así
      $('#modalExtenderSesion').modal('show');

      contador = 30;
      let contadorModalCierreSesion = document.querySelector('.contador-modal-cerrar-sesion');

      contadorSegModal = window.setInterval(()=>{
        contadorModalCierreSesion.innerText = contador;
        contador -= 1;
      }, 1000);

      //defino un setTimeOut para el modal, si no hay respuesta en 30 segundos se cierra la sesion automaticamente
      contadorModal = window.setTimeout(()=>{
        window.location.href = '/login.html'
      }, (1000*31));
    }, (1000*180));
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
