$(document).ready(function () {

  //lista inicial de los usuarios
  let listaUsuarios = [];

  //funcion para crear un usuario
  const crearUsuario = () => {
    let nuevoUsuario = new Usuario({
      nombreUs: $("#resgistroNombre").val(),
      rutUs: $("#resgistroDni").val(),
      correoUs: $("#resgistroEmail").val(),
      claveUs: $("#resgistroContrasena").val(),
      ofertaCreditoUs: true,
      montoOfertaCreditoUs: 500000,
      billeteraUs: [ 
        //para efectos de la simulacion se le crearan 2 cuentas con saldos de prueba para poder hacer transferencias entre ellas
        new Cuenta({
          numeroC: Math.floor(100000 + Math.random() * 900000), //codigo para crear un numero de cuenta aleatorio de 6 digitos
          saldoC: 100000,
          sobregiroC: 30000
        }),
        new Cuenta({
          numeroC: Math.floor(100000 + Math.random() * 900000), //codigo para crear un numero de cuenta aleatorio de 6 digitos
          saldoC: 55000,
          sobregiroC: 10000
        })
      ]
    });

    listaUsuarios.push(nuevoUsuario);
    guardarLocalStorage('listaUsuariosLS', listaUsuarios);
  }

  //funcion para validar el usuario en el login
  const validarUsuario = () => {
    let emailUsuario = $('#mailUsuarioLogin').val();
    let contrasenaUsuario = $('#contrasenaUsuarioLogin').val();

    let usuariosLS = obtenerLocalStorage('listaUsuariosLS');

    //bucle para recorrer todos los registros de usuarios en la lista de LocaStorage
    $.each(usuariosLS, (index, value) => {
      //Si el dato de mail es igual a la propiedad .mail de cada objeto
      if (value.mail == emailUsuario) {
        //Si los valores de mail y contraseña son iguales a los del objeto
        if (value.mail == emailUsuario && value.clave == contrasenaUsuario) {
          //Me envía al Dasboard
          window.location.href = `/dashboard.html?user=${value.rut}&cuenta=${value.billetera[0].numCuenta}`;
        } else {
          $('#contrasenaUsuarioLogin').addClass('is-invalid');
        }

      } else {
        $('#mailUsuarioLogin').addClass('is-invalid');
      }
    });
  }

  //evento para el formulario de registro
  $("#btnCrearCuenta").on("click", (e) => {
    if ($("#resgistroContrasena").val() != $("#resgistroContrasena2").val()) {
      $("#resgistroContrasena2").addClass('is-invalid');
    } else {
      crearUsuario();
      //tomo los datos del ultimo usuario registrado y los manda como variables GET
      let ultimoUsuario = listaUsuarios[listaUsuarios.length - 1];
      window.location.href = `/dashboard.html?user=${ultimoUsuario.rut}&cuenta=${ultimoUsuario.billetera[0].numCuenta}`;
    }
  });

  //evento para el formulario del login
  $('#btnLogin').on('click', (e) => {
    e.preventDefault();
    validarUsuario();
  });
});