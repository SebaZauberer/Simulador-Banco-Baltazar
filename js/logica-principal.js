/* Entidades */
class Usuario {
  constructor({
    rutUs,
    claveUs,
    nombreUs,
    correoUs,
    ofertaCreditoUs = false,
    montoOfertaCreditoUs = 0,
    billeteraUs = []
  }) {
    this.rut = rutUs,
      this.clave = claveUs,
      this.nombre = nombreUs,
      this.mail = correoUs,
      this.ofertaCredito = ofertaCreditoUs,
      this.montoOfertaCredito = montoOfertaCreditoUs,
      this.billetera = billeteraUs
  }
}

class Cuenta {
  constructor({
    numeroC,
    saldoC,
    sobregiroC,
    movimientosC = []
  }) {
    this.numCuenta = numeroC,
      this.saldo = saldoC,
      this.sobregiro = sobregiroC,
      this.movimientos = movimientosC
  }

  agregarSaldo(monto) {
    //se agrega el monto al saldo
    this.saldo += monto;
    //se registra el movimiento de dinero
    this.movimientos.push({
      titulo: "transferencia",
      monto: monto,
      tipoMovimiento: "Ingreso",
    })
  }

  retirarSaldo(monto) {
    //se resta el monto del saldo
    this.saldo -= monto;

    //si la resta al saldo da un numero negativo se resta la diferencia al sobregiro y el saldo queda en "0"
    if (this.saldo < 0) {
      alert('El monto a retirar es menor a su saldo, se descontara de su sobregiro')
      this.sobregiro -= this.saldo;
      this.saldo -= this.saldo;
    }

    //se registra el movimiento de dinero
    this.movimientos.push({
      titulo: "transferencia",
      monto: monto,
      tipoMovimiento: "Egreso",
    });
  }
}

/* Constantes */
const persona1 = new Usuario({
  rutUs: 123456789,
  claveUs: 1234,
  nombreUs: "Sebastian",
  correoUs: "seba@gmail.com",
  billeteraUs: [
    new Cuenta({
      numeroC: Math.floor(100000 + Math.random() * 900000), //codigo para crear un numero de cuenta aleatorio de 6 digitos
      saldoC: 1000,
      sobregiroC: 3000
    })
  ]
});

/* Funciones */

// Local storage
const guardarLocalStorage = (claveLS, valorLS) => {
  localStorage.setItem(claveLS, JSON.stringify(valorLS));
}

const obtenerLocalStorage = (itemLS) => {
  let listaLocalStorage = localStorage.getItem(itemLS),
  listaUsuarios = [];

  if (listaLocalStorage != null) {
    listaUsuarios = JSON.parse(listaLocalStorage);
  }

  return listaUsuarios;
}

document.querySelectorAll('.saldo').forEach(element => element.innerText = '$' + persona1.billetera[0].saldo);

const aumentarSaldoCuenta = (usuario) => {
  let inputAgregarDinero = document.getElementById('inputAgregarDinero');
  let cantidadAumento = parseInt(inputAgregarDinero.value);
  usuario.billetera[0].agregarSaldo(cantidadAumento);

  document.querySelectorAll('.saldo').forEach(element => element.innerText = '$' + persona1.billetera[0].saldo);
  inputAgregarDinero.value = '';

  registrarMovimientos(usuario.billetera[0]);
}

const registrarMovimientos = (cuenta) => {
  let registros = document.querySelector('#listaMovimientos');

  let listadoMovimientos = cuenta.movimientos.map(element => {
    return `<div class="card card-movimiento bg-light text-black shadow">
      <div class="card-body">
        <span class="tipo-movimiento">${element.tipoMovimiento}</span>
        <div class="cantidad-movimiento text-black-50 small">$${element.monto}</div>
      </div>
    </div>
    `;
  });

  registros.innerHTML = listadoMovimientos;
}

/* Eventos */
document.querySelector('#btnAgregarDinero').addEventListener('click', () => {
  aumentarSaldoCuenta(persona1);
});