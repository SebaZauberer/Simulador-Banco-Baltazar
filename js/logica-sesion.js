//funcion para simular el metodo .ready() para cargar script cuando se cargue la pagina
var ready = (callback) => {
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

  //console.log(usuarioActivo.nombre);
  //scripts para manetener y cerrar sesión en el dashboard
  let contado
  let contadorModal;
  let contadorSegModal;

  //funcion para mostrar un modal cada 1 minuto para preguntar si se desea mantener la sesion abierta
  let iniciarSesion = () => {
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
    }, (1000*60));
  }

  let mantenerSesion = () => {
    clearInterval(contadorSegModal);
    clearTimeout(contadorModal);
    iniciarSesion();
  }

  iniciarSesion();

  document.querySelector('#btnMantenerSesion').addEventListener('click', () => {
    mantenerSesion();
    $('#modalExtenderSesion').modal('hide');
  });
});
