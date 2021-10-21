//Script para crear una cuenta

//funcion para crear un usuario
let crearUsuario = () => {
  const usuario = new Usuario({
    nombreUs: document.getElementById("resgistroNombre").value,
    rutUs: document.getElementById("resgistroDni").value,
    correoUs: document.getElementById("resgistroEmail").value,
    claveUs: document.getElementById("resgistroContrasena").value,
  });

  let lista;

  if (localStorage.getItem("listaUsuarios") != null) {
    lista = JSON.parse(localStorage.getItem("listaUsuarios"))
    lista.push(usuario)
    localStorage.setItem("listaUsuarios", JSON.stringify(lista))
  }
  listaUsuarios.push(usuario)

  return usuario
}

//evento para ejecutar la funcion
document.getElementById("btnCrearCuenta").onclick((e)=> {
  crearUsuario();
  window.location.href = "https://professor-falken.com";
});