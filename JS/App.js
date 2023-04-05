// //DROP-DOWN MENU FUNCTION
// const gear_icon = document.querySelector('.gear_icon')
// const setup_menu = document.querySelector('.container-menu')


// gear_icon.addEventListener('click', () => {
//     setup_menu.classList.toggle("spread")
// })

// window.addEventListener('click', e => {
//     if (setup_menu.classList.contains('spread')
//         && e.target != setup_menu && e.target != gear_icon) {
//         console.log('cerrar')
//         setup_menu.classList.toggle("spread")
//     }
// })


//GET NAME PLAYER
const spanNombre = document.getElementById('nombre');
const nombre = localStorage.getItem('nombre');

if (nombre) {
    spanNombre.textContent = nombre;
}


document.getElementById("btn-pedir-nombre").addEventListener("click", function () {
    Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!/^[a-zA-Z0-9]*$/g.test(value)) {
                return 'Solo se permiten letras';
            }
            if (value.length < 3) { // mínimo de 3 caracteres
                return 'El nombre debe tener al menos 3 caracteres';
            }
            if (value.length > 10) { // máximo de 30 caracteres
                return 'El nombre no debe tener más de 10 caracteres';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarNombre(result.value);
        }
    });
});
function mostrarNombre(nombre) {
    // Obtener la etiqueta span en HTML
    const spanNombre = document.getElementById('nombre');

    // Asignar el valor ingresado por el usuario a la etiqueta span
    spanNombre.textContent = nombre;
}


//HOW TO PLAY
const btnhdp = document.querySelector('.two');

btnhdp.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: '¿Como jugar?',
        text: "El objetivo del Juego de 'Emparejado2' es que el jugador de la vuelta a pares de cartas iguales. En un turno, si el jugador elige dos cartas cuyos simbolos coincidan, se mostraran los simbolos emparejados. Sin embargo, si el jugador elige dos cartas con simbolos diferentes, ambas volveran a voltearse.El juego termina cuando se han descubierto los 18 pares de cartas iguales.",
        confirmButtonText: '¡Entendido!',
    });
});

//GAME LOGIC

