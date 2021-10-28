$(document).ready(function () {
  
  //Script para crear una cuenta
  let listaUsuarios = [];
  
  //funcion para crear un usuario
  
  let crearUsuario = () => {
    const usuario = new Usuario({
      nombreUs: $("#resgistroNombre").val(),
      rutUs: $("#resgistroDni").val(),
      correoUs: $("#resgistroEmail").val(),
      claveUs: $("#resgistroContrasena").val(),
    });
  
    let lista;
  
    if (localStorage.getItem("listaUsuarios") != null) {
      lista = JSON.parse(localStorage.getItem("listaUsuarios"));
      lista.push(usuario);
      localStorage.setItem("listaUsuarios", JSON.stringify(lista));
    }
    listaUsuarios.push(usuario);
  
    return usuario
  }
  
  //evento para ejecutar la funcion
  $("#btnCrearCuenta").on("click", (e)=> {
    crearUsuario();
    window.location.href = "dashboard.html";
  });
});