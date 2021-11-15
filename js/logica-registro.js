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

  //evento para ejecutar la funcion
  $("#btnCrearCuenta").on("click", (e) => {
    crearUsuario();
    //window.location.href = "dashboard.html";
  });
});