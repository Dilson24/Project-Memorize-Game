//DROP-DOWN MENU FUNCTION
const gear_icon = document.querySelector('.gear_icon')
const setup_menu = document.querySelector('.container-menu')


gear_icon.addEventListener('click', () => {
    setup_menu.classList.toggle("spread")
    pauseTimer()
})

window.addEventListener('click', e => {
    if (setup_menu.classList.contains('spread') && e.target != setup_menu && e.target != gear_icon) {
        setup_menu.classList.toggle("spread")
        console.log('cerrar')
        if (test >= 1) {
            restartTimer();
        }
    }
})

// variables globales
let currentLevel;
const startButton = document.querySelector('#select-level');

function selectLevel() {
    // Mostramos el SweetAlert para seleccionar el nivel
    const levels = ["easy", "medium", "hard"];

    Swal.fire({
        title: "Selecciona un nivel",
        input: "select",
        inputOptions: {
            easy: "Fácil",
            medium: "Medio",
            hard: "Difícil",
        },
        inputPlaceholder: "Selecciona un nivel",
        showCancelButton: true,
        allowOutsideClick: false, // Evita que el SweetAlert se cierre al hacer clic fuera de él
        inputValidator: (value) => {
            if (!value || !levels.includes(value)) {
                return "Por favor, selecciona un nivel";
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            currentLevel = result.value;
            createCardDiv(currentLevel);
        }
    });
}

startButton.addEventListener('click', () => {
    selectLevel();
});


/////////////////////////////////////////////////////////////
// Apenas se recargue la pagina
window.addEventListener('load', function () {
    selectLevel();
});


/////////////////////////////////////////////////////////////

// Niveles de dificultad con los iconos


const levels = {

    hard: ["fa-home", "fa-user", "fa-heart", "fa-search", "fa-envelope", "fa-phone", "fa-shopping-cart", "fa-lock", "fa-cog", "fa-graduation-cap", "fa-camera", "fa-music", "fa-map-marker", "fa-wrench", "fa-plane", "fa-globe", "fa-chess-pawn", "fa-chess-knight"],
    medium: ['fa-anchor', 'fa-balance-scale', 'fa-bell', 'fa-bug', 'fa-calendar', 'fa-certificate', 'fa-chess-knight', 'fa-cloud', 'fa-diamond', 'fa-fighter-jet', 'fa-fire-extinguisher', 'fa-graduation-cap',],
    easy: ['fa-ambulance', 'fa-bicycle', 'fa-binoculars', 'fa-bomb', 'fa-book', 'fa-briefcase', 'fa-camera', 'fa-coffee',]

}

// Funcion para crear las cartas segun la dificultad

let container = document.querySelector('.cards');


function createCardDiv(currentLevel) {

    // Eliminar todas las cartas existentes antes de dibujar nuevas cartas
    while (container.firstChild) {
        container.removeChild(container.firstChild);
        // Detener el contador de tiempo
        clearInterval(timer);
        // Reiniciar variables y elementos del juego
        flippedCards = [];
        matchedCards = 0;
        moves = 0;
        seconds = 0;
        minutes = 0;
        test = 0;
        timer = null;
        // Actualizar elementos en la interfaz de usuario
        document.querySelector('.timer-minutes').textContent = '00';
        document.querySelector('.timer-seconds').textContent = '00';
        document.querySelector('.moves').textContent = '0';

    }

    const cards = levels[currentLevel];

    // Duplicar y mezclar aleatoriamente el arreglo
    const shuffledCards = cards.concat(cards).sort(() => Math.random() - 0.5);

    shuffledCards.forEach((card) => {
        const newDiv = `
            <div class="card-${currentLevel}">
                <div class="view front-view">
                    <span class="front-icon ${currentLevel}"><i class="fa-solid fa-question"></i></span>
                </div>
                <div class="view back-view" >
                    <span class="back-icon ${currentLevel}"><i class="fa-solid ${card}" data-icon="${card}"></i></span>
                </div>
            </div>
        `;

        container.innerHTML += newDiv;
    });
}


///////////////////////////////////////////////////
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let test = 0;

function voltearCarta(event) {
    const card = event.target.closest('.card-' + currentLevel);
    if (card.classList.contains("back-view")) {
        return;
    }
    if (!card.classList.contains("matched") && flippedCards.length < 2) {
        test++
        console.log(flippedCards)
        if (flippedCards.length === 0 && !timer) {

            restartTimer();
        }

        card.classList.toggle("back-view");
        flippedCards.push(card);
        if (flippedCards.length === 1) {
           
            cardTimeout = setTimeout(() => {
                if (flippedCards.length === 1) {
                    card.classList.toggle("back-view");
                    flippedCards.pop();
                }
            }, 5000);
        } else {
            
            clearTimeout(cardTimeout);
        }
        if (flippedCards.length === 2) {
            moves++;
            const icon1 = flippedCards[0].querySelector('.back-icon i').getAttribute('data-icon');
            const icon2 = flippedCards[1].querySelector('.back-icon i').getAttribute('data-icon');
            if (icon1 === icon2) {

                matchedCards++;
                flippedCards[0].classList.add("matched");
                flippedCards[1].classList.add("matched");
                flippedCards[0].querySelector(".back-icon").classList.add("matched-icon");
                flippedCards[1].querySelector(".back-icon").classList.add("matched-icon");
                flippedCards = [];
                if (matchedCards === levels[currentLevel].length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        Swal.fire({
                            title: '¡Felicitaciones, has ganado!',
                            text: `¡Has encontrado todas las parejas en un tiempo de ${minutes}:${seconds}, usaste ${moves} movimientos!`,
                            showCancelButton: true,
                            confirmButtonText: 'Reiniciar',
                            cancelButtonText: 'Canbiar dificultad',
                            customClass: {
                                confirmButton: 'btn-play',
                                cancelButton: 'btn-htp'
                            },
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                reiniciarJuego();
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                selectLevel();
                            }
                        });
                    });

                    document.removeEventListener("visibilitychange", handleVisibilityChange);
                    test = 0;
                }
            } else {
                setTimeout(() => {


                    flippedCards[0].classList.toggle("back-view");
                    flippedCards[1].classList.toggle("back-view");
                    flippedCards = [];


                }, 1000);


            }

        }

        document.querySelector('.moves').textContent = moves;
    }
}


const cardsContainer = document.querySelector('.cards');
cardsContainer.addEventListener('click', voltearCarta);

////////////////////////////////////////////////////////////////////


let timer; // variable para almacenar el identificador del intervalo del contador
let seconds = 0; // variable para almacenar los segundos
let minutes = 0; // variable para almacenar los minutos

// Función para actualizar el contador de tiempo
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    document.querySelector('.timer-minutes').textContent = padNumber(minutes);
    document.querySelector('.timer-seconds').textContent = padNumber(seconds);
}

// Función para añadir un cero a la izquierda si el número tiene un solo dígito
function padNumber(number) {
    return String(number).padStart(2, '0');
}

////////////////////////////////////////////////////////////////////////////////


// Función para pausar el contador de tiempo
function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

// Función para reiniciar el contador de tiempo
function restartTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

//////////////////////////////////////////////////////////////////////////////////


// Definir la función manejadora de eventos
function handleVisibilityChange() {
    if (document.hidden) {
        pauseTimer(); // Pausar el contador de tiempo cuando la ventana no está activa
    } else {
        // Reiniciar el contador de tiempo cuando la ventana vuelve a estar activa
        if (test >= 1) {
            restartTimer();
        }
    }
}

// Agregar el evento de escucha
document.addEventListener("visibilitychange", handleVisibilityChange);


///////////////////////////////////////////////////////////////////////////

// Agrega un evento click al botón de reinicio
document.getElementById("reset-button").addEventListener("click", reiniciarJuego);
// Función de reinicio
function reiniciarJuego() {
    // Detener el contador de tiempo
    clearInterval(timer);
    // Reiniciar variables y elementos del juego
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    seconds = 0;
    minutes = 0;
    test = 0;
    timer = null;
    // Actualizar elementos en la interfaz de usuario
    document.querySelector('.timer-minutes').textContent = '00';
    document.querySelector('.timer-seconds').textContent = '00';
    document.querySelector('.moves').textContent = '0';
    // Desvoltear todas las cartas
    const cards = document.querySelectorAll('.card-' + currentLevel);
    cards.forEach(card => {
        card.classList.remove('back-view', 'matched');
    });
    createCardDiv(currentLevel);
}
