function seleccionarMolienda(botonSeleccionado) {
    const botones = document.querySelectorAll('.boton');

    botones.forEach(b => b.classList.remove("seleccionado"));

    botonSeleccionado.classList.add("seleccionado");
}