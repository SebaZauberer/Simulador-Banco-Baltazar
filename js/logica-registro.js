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

  //funcion parz validar el usuario en el login
  const validarUsuario = () =>{
    let emailUsuario = $('#mailUsuarioLogin').val();
    let contrasenaUsuario = $('#contrasenaUsuarioLogin').val();

    let usuariosLS = obtenerLocalStorage('listaUsuariosLS');

    //bucle para recorrer tosos los registros de usuarios en la lista de LocaStorage
    $.each(usuariosLS, (index, value) =>{
      //Si el de mail es igual a la propiedad .mail de cada objeto
      if(value.mail == emailUsuario){
        //Si los valores de mail y contraseña son iguales a los del objeto
        if(value.mail == emailUsuario && value.clave == contrasenaUsuario){
          //Me envía al Dasboard
          window.location.href = "dashboard.html";
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
    if($("#resgistroContrasena").val() != $("#resgistroContrasena2").val()){
      $("#resgistroContrasena2").addClass('is-invalid');
      console.log('error de contraseña');
    } else{
      crearUsuario();
      window.location.href = "dashboard.html";
    }
  });

  //evento para el formulario del login
  $('#btnLogin').on('click', (e) => {
    e.preventDefault();
    validarUsuario();
  });
});