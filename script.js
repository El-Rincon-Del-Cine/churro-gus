// Función para mostrar la fecha actual en el pie de página
function mostrarFecha() {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
    const footer = document.querySelector('footer');
    footer.innerHTML += `<p>Fecha actual: ${fechaFormateada}</p>`;
}

// Función para alternar entre modo claro y oscuro
function alternarModo() {
    const body = document.body;
    body.classList.toggle('modo-oscuro');

    // Guardar la preferencia del usuario en localStorage
    if (body.classList.contains('modo-oscuro')) {
        localStorage.setItem('modo', 'oscuro');
    } else {
        localStorage.setItem('modo', 'claro');
    }
}

// Función para mostrar u ocultar el botón "Subir"
function mostrarBotonSubir() {
    const botonSubir = document.getElementById('subir');
    if (window.scrollY > 300) {
        botonSubir.style.display = 'block';
    } else {
        botonSubir.style.display = 'none';
    }
}

// Función para subir al principio de la página
function subirAlInicio() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Cargar el modo guardado al cargar la página
function cargarModoGuardado() {
    const modo = localStorage.getItem('modo');
    if (modo === 'oscuro') {
        document.body.classList.add('modo-oscuro');
    }
}

// Eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarFecha();
    cargarModoGuardado();

    // Botón de modo oscuro/claro
    const botonModo = document.createElement('button');
    botonModo.id = 'modo';
    botonModo.textContent = '🌙 Modo Oscuro';
    document.body.appendChild(botonModo);
    botonModo.addEventListener('click', alternarModo);

    // Botón para subir
    const botonSubir = document.createElement('button');
    botonSubir.id = 'subir';
    botonSubir.textContent = '⬆️ Subir';
    document.body.appendChild(botonSubir);
    botonSubir.addEventListener('click', subirAlInicio);

    // Mostrar u ocultar el botón "Subir" al hacer scroll
    window.addEventListener('scroll', mostrarBotonSubir);
});