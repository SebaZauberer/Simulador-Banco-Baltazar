let queryGet = window.location.search.substring(1);
let listaUsuarios = obtenerLocalStorage('listaUsuariosLS');

const obtenerVariablesGET = (variable) => {
  let variablesGet = queryGet.split("&");

  for (let i=0; i < variablesGet.length; i++) {
      let pair = variablesGet[i].split("="); 
      if (pair[0] == variable) {
          return pair[1];
      }
  }
  return false;
}

let usuarioActivo = listaUsuarios.find(item => item.rut == obtenerVariablesGET('user'));

console.log(usuarioActivo.nombre);