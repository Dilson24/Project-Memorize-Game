//SweetAlert's
const playerBtn = document.querySelector('.btn-play');
const hdpBtn = document.querySelector('.btn-htp');

playerBtn.addEventListener('click', () => {
        Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        inputValidator: (value) => {
            if (!/^[a-zA-Z0-9]*$/g.test(value)) {
                return 'Solo se permiten letras';
            }
            if (value.length < 3) { 
                return 'El nombre debe tener al menos 3 caracteres';
            }
            if (value.length > 10) { 
                return 'El nombre no debe tener más de 10 caracteres';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('nombre', result.value);
            window.location.href = 'Memorize_game.html';
        }
    });
});

hdpBtn.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'Como jugar',
        text: "El objetivo del Juego de 'Emparejado2' es que el jugador de la vuelta a pares de cartas iguales. En un turno, si el jugador elige dos cartas cuyos simbolos coincidan, se mostraran los simbolos emparejados. Sin embargo, si el jugador elige dos cartas con simbolos diferentes, ambas volveran a voltearse. El juego termina cuando se han descubierto todos los pares de cartas iguales.",
        confirmButtonText: '¡Entendido!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
    });
});