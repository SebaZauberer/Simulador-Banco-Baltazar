/* Entidades */
class Usuario{
  constructor({
    rutUs,
    claveUs,
    nombreUs,
    correoUs,
    ofertaCreditoUs = false,
    montoOfertaCreditoUs = 0,
    billeteraUs = []
  }){
    this.rut = rutUs,
    this.clave = claveUs,
    this.nombre = nombreUs,
    this.mail = correoUs,
    this.ofertaCredito = ofertaCreditoUs,
    this.montoOfertaCredito = montoOfertaCreditoUs,
    this.billetera = billeteraUs
  }
}

class Cuenta{
  constructor({
    numeroC,
    saldoC,
    sobregiroC,
    movimientosC = []
  }){
    this.numCuenta = numeroC,
    this.saldo = saldoC,
    this.sobregiro = sobregiroC,
    this.movimientos = movimientosC
  }

  agregarSaldo(monto){
    //se agrega el monto al saldo
    this.saldo += monto;
    //se registra el movimiento de dinero
    this.movimientos.push({
      titulo: "transferencia",
      monto: monto,
      tipoMovimiento: "ingreso",
    })
    alert(`Se agregaron + $${monto} al saldo de tu cuenta`);
  }

  retirarSaldo(monto){
    //se resta el monto del saldo
    this.saldo -= monto;

    //si la resta al saldo da un numero negativo se resta la diferencia al sobregiro y el saldo queda en "0"
    if(this.saldo < 0){
      alert('El monto a retirar es menor a su saldo, se descontara de su sobregiro')
      this.sobregiro -= this.saldo;
      this.saldo-= this.saldo;
    } else{
      alert(`Se restaron - $${monto} al saldo de tu cuenta`);
    }
    
    //se registra el movimiento de dinero
    this.movimientos.push({
      titulo: "transferencia",
      monto: monto,
      tipoMovimiento: "egreso",
    });
  }
}

/* Constantes */
const persona1 = new Usuario({
  rutUs: 123456789,
  claveUs: 1234,
  nombreUs: "Sebastian",
  correoUs: "seba@gmail.com"
});

/* Funciones */
let crearCuentaBancaria = (usuario) => {
  //se consulta si quiere crear una cuenta
  let creacionCuenta = confirm(`Bienvenido ${usuario.nombre} al Banco Baltazar, ¿desea crear una cuenta bancaría con nosotros?`);

  if(creacionCuenta == true){
    usuario.billetera.push(new Cuenta({
      numeroC: Math.floor(100000 + Math.random() * 900000), //codigo para crear un numero de cuenta aleatorio de 6 digitos
      saldoC: 0,
      sobregiroC: 3000
    }));

    aumentarSaldoCuenta(usuario);
  }
}

let aumentarSaldoCuenta = (usuario) => {
  //se consulta si quiere aumentar el saldo
  let desicionAumentoSaldo = confirm(`¿Desea agregar saldo a su nueva cuenta?`);
  
  if(desicionAumentoSaldo == true){
    let cantidadAumento = parseInt(prompt('¿cuanto desea agregar?'));
    usuario.billetera[0].agregarSaldo(cantidadAumento);
  }

  restarSaldoCuenta(usuario);
}

let restarSaldoCuenta = (usuario) => {
  //se consulta si quiere retirar saldo
  let desicionRetiroSaldo = confirm(`¿Desea retirar saldo de su cuenta?`);
  
  if(desicionRetiroSaldo == true){
    let cantidadRetiro = parseInt(prompt('¿cuanto desea retirar?'));
    usuario.billetera[0].retirarSaldo(cantidadRetiro);

    verCartolaMovimientos(usuario);
  } else{
    verCartolaMovimientos(usuario);
  }
}

let verCartolaMovimientos = (usuario) =>{
  //se consulta si quiere ver la "cartola" con el registro de movimientos de dinero
  let desicionVerCartola = confirm(`¿Desea ver los movimientos de dinero de su cuenta?`);

  if(desicionVerCartola == true){
    alert("A continuación podrá ver sus movimientos de dindero por consola")

    //se imprime cada valor de array de Movimientos
    usuario.billetera[0].movimientos.forEach(element => {
      console.log(element);
    });
  }
}

crearCuentaBancaria(persona1);
console.log(persona1);