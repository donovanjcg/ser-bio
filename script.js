function agregar(nombre,precio){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

carrito.push({nombre,precio});

localStorage.setItem("carrito",JSON.stringify(carrito));

actualizarContador();

alert("Producto agregado");

}



function actualizarContador(){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let num = carrito.length;

if(document.getElementById("carrito-num")){

document.getElementById("carrito-num").innerText=num;

}

}

actualizarContador();



function irCarrito(){

window.location="checkout.html";

}



function cargarCarrito(){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let lista = document.getElementById("lista");

let total=0;

carrito.forEach(p=>{

lista.innerHTML += `<p>${p.nombre} - $${p.precio}</p>`;

total += p.precio;

});

document.getElementById("total").innerText="$"+total;

}

if(document.getElementById("lista")){

cargarCarrito();

}



document.getElementById("ciudad")?.addEventListener("change",function(){

let ciudadesGratis=[

"Medellín",
"Bello",
"Envigado",
"Itagüí",
"Sabaneta",
"La Estrella",
"Copacabana",
"Girardota"

];

if(ciudadesGratis.includes(this.value)){

document.getElementById("envio").innerText="🚚 Envío GRATIS";

}else{

document.getElementById("envio").innerText="🚚 Envío $10.000";

}

});



function pagarWhatsapp(){

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let mensaje="Hola quiero pedir:%0A";

carrito.forEach(p=>{

mensaje += p.nombre+" $"+p.precio+"%0A";

});

window.open("https://wa.me/573000000000?text="+mensaje);

}