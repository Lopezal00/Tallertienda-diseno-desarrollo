// precios por libra
const PRECIO_ARROZ = 3000;
const PRECIO_AZUCAR = 2500;
const PRECIO_CAFE = 2500;

// función que realiza el cálculo y muestra el resultado
function calcularFactura(event) { // previene el envío del formulario
    if (event) event.preventDefault(); // para evitar que la página se recargue al enviar el formulario

    const arroz = Number(document.getElementById('cantidadArroz').value) || 0; // el operador || 0 asegura que si el campo está vacío, se considere como 0
    const azucar = Number(document.getElementById('cantidadAzucar').value) || 0;
    const cafe = Number(document.getElementById('cantidadCafe').value) || 0;
    const pago = Number(document.getElementById('montoPago').value) || 0;

    const totalSin = arroz * PRECIO_ARROZ + azucar * PRECIO_AZUCAR + cafe * PRECIO_CAFE; // cálculo del total sin descuento
    let descuento = 0; //
    if (totalSin >= 50000) { // si el total sin descuento es mayor o igual a 50,000, se aplica un descuento del 10%
        descuento = totalSin * 0.1;
    }
    const totalCon = totalSin - descuento; // cálculo del total con descuento

    const diferencia = pago - totalCon; // cálculo de la diferencia entre el pago y el total a pagar para determinar si se debe devolver dinero o si falta dinero
    let mensajePago;
    if (diferencia > 0) {
        mensajePago = `Devueltas: $${diferencia.toFixed(2)}`;
    } else if (diferencia < 0) {
        mensajePago = `Falta dinero: $${Math.abs(diferencia).toFixed(2)}`;
    } else {
        mensajePago = 'Pago exacto';
    }

    const resultadoDiv = document.getElementById('resultado');  // se obtiene el elemento donde se mostrará el resultado
    if (resultadoDiv) {
        // formateador con separador de miles punto y coma decimal
        const formatear = n => n.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        resultadoDiv.innerHTML = ` 
            <p>Total sin descuento: $${formatear(totalSin)}</p>
            <p>Descuento: $${formatear(descuento)}</p>
            <p>Total a pagar: $${formatear(totalCon)}</p>
            <p>${mensajePago}</p>
        `; // se muestra el resultado con formato de moneda y se incluye el mensaje de pago
    }
}

document.addEventListener('DOMContentLoaded', () => { // se asegura de que el DOM esté completamente cargado antes de intentar acceder a los elementos
    const form = document.getElementById('formFactura');
    if (form) {
        form.addEventListener('submit', calcularFactura);// se llama a la función calcularFactura cuando se envía el formulario
    }
});