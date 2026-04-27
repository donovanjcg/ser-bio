function seleccionarMolienda(botonSeleccionado) {
    const botones = document.querySelectorAll('.boton');

    botones.forEach(b => b.classList.remove("seleccionado"));

    botonSeleccionado.classList.add("seleccionado");
}

function cargarMunicipios() {
    const municipiosPorDepartamento = {
        "Antioquia": [
            "Medellín",
            "Envigado",
            "Bello",
            "La Estrella",
            "Sabaneta",
            "Copacabana",
            "Girardota",
            "Itagüí",
            "Rionegro",
            "Caldas",
            "Guarne"
        ],
        "Resto del País": [""]
    };

    const departamento = document.getElementById("departamento").value;
    const municipioSelect = document.getElementById("municipio");

    // Limpiar municipios
    municipioSelect.innerHTML = '<option value="Otro">Otro</option>';

    if (departamento && municipiosPorDepartamento[departamento]) {
        municipiosPorDepartamento[departamento].forEach(municipio => {
            const option = document.createElement("option");
            option.value = municipio;
            option.textContent = municipio;
            municipioSelect.appendChild(option);
        });
    }
}

function disminuir() {

}

function aumentar() {
    const span = document.getElementById("cantidad");
    let cantidad = parseInt(span.innerText) || 0;
    span.innerText = cantidad + 1;
}

function disminuir() {
    const span = document.getElementById("cantidad");
    let cantidad = parseInt(span.innerText) || 0;

    if (cantidad > 1) {
        span.innerText = cantidad - 1;
    }
}

function calcularTotal(present) {
    const cantidad = parseInt(document.getElementById("cantidad").innerText) || 1;
    if (present == "media_libra"){
        var precioUnitario = 2000; // 👈 cambia esto por tu precio real;
    } else if (present == "libra"){
        var precioUnitario = 42000;
    } else {
        var precioUnitario = 189900
    }
    const departamento = document.getElementById("departamento").value;
    const municipio = document.getElementById("municipio").value;

    // 💰 TOTAL PRODUCTO
    const totalProducto = cantidad * precioUnitario;

    // ⚖️ CALCULAR PESO
    let kilos = 1;

    if (present === "media_libra") {
        // 2 medias libras = 1 kilo (por empaque)
        kilos = Math.ceil(cantidad / 3);
    }

    if (present === "libra") {
        // 1 libra = 1 kilo
        kilos = cantidad;
    }

    if (present === "libra") {
        // 1 libra = 1 kilo
        kilos = cantidad * 3;
    }

    // 🚚 COSTO ENVÍO BASE
    let envio = 18000;

    if (departamento === "Antioquia") {
        const gratis = ["Medellín","Envigado","Bello","La Estrella","Sabaneta","Copacabana","Girardota","Itagüí"];
        const zona8800 = ["Rionegro","Caldas"];

        if (gratis.includes(municipio)) {
            envio = 0;
        } else if (zona8800.includes(municipio)) {
            envio = 8800;
        } else if (municipio === "Guarne") {
            envio = 11000;
        } else {
            envio = 18000;
        }
    } else {
        envio = 18000
    }

    // ➕ KILOS ADICIONALES
    if (kilos > 1) {
        envio += (kilos - 1) * 4400;
    }

    // 🧾 TOTAL FINAL
    const totalFinal = totalProducto + envio;

    // 🎯 Mostrar resultados
    document.getElementById("envio").innerText = envio.toLocaleString();
    document.getElementById("total").innerText = totalProducto.toLocaleString(); 
    document.getElementById("totalpagar").innerText = totalFinal.toLocaleString(); 
    
    const boton = document.getElementById("botonpago");
    if (boton.style.display === "none") {
        boton.style.display = "block"; // o "flex", "inline-block", etc.
    }

    const contenedor = document.getElementById('epayco-button-container').style.display = "none";
}

function calcularboton (){
    document.getElementById('epayco-button-container').style.display = "block";
    document.getElementById("botonpago").style.display = "none"
    const totalTexto = document.getElementById("totalpagar").innerText;
    const totalpago = parseInt(totalTexto.replace(/\./g, '').replace(/,/g, ''));

    const contenedor = document.getElementById('epayco-button-container');
    if (contenedor) {
        contenedor.innerHTML = ''; // Limpiar el contenedor
    }
    
    // 2. Crear el nuevo script con el valor actualizado
    const script = document.createElement('script');
    script.src = 'https://checkout.epayco.co/checkout.js';
    script.setAttribute('data-epayco-key', '0264589072eed07a1691432a43571d49');
    script.setAttribute('class', 'epayco-button');
    script.setAttribute('data-epayco-amount', totalpago);
    script.setAttribute('data-epayco-tax', '0');
    script.setAttribute('data-epayco-tax-ico', '0');
    script.setAttribute('data-epayco-tax-base', '0');
    script.setAttribute('data-epayco-name', '(Prueba) Café Molido 500 gramos - Ser Café');
    script.setAttribute('data-epayco-currency', 'COP');
    script.setAttribute('data-epayco-country', 'CO');
    script.setAttribute('data-epayco-test', '');
    script.setAttribute('data-epayco-external', '');
    script.setAttribute('data-epayco-response', '');
    script.setAttribute('data-epayco-confirmation', '');
    script.setAttribute('data-epayco-button', 'https://multimedia.epayco.co/adquirencia-movil/botones/boton-azul-124_38.png');
    
    // 3. Agregar el nuevo script al contenedor
    if (contenedor) {
        contenedor.appendChild(script);
    }
}