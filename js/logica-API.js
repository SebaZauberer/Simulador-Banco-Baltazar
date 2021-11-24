$(document).ready(function () {
/* peticion AJAX por GET */
//Url API de la informacion de la UF
const URLGET = "https://mindicador.cl/api/uf";
//script para hacer un llamado AJAX y traer el valor monetario y la fecha de la informacion

  $('#btnInfoValorUf').click(function (e) { 
    e.preventDefault();

    $.get(URLGET, function (respuesta, estado) {
      if (estado === "success") {
        let misDatos = respuesta.serie[0];
        let fechaDato = misDatos.fecha.substr(0,10);
        let valorDato = Math.floor(misDatos.valor);
        
        $('.valor-uf').text(valorDato);
        $('.fecha-uf').text(fechaDato);
      }
    });
  });
});