//GLOBAL VARIABLES
const spanNombre = document.querySelector('.player-name');
const nombre = localStorage.getItem('nombre');
const playerBtn = document.querySelector('.four');
const hdpBtn = document.querySelector('.two');
const gearIconBtn = document.querySelector('.gear-icon');
const setup_menu = document.querySelector('.container-menu');
const header = document.querySelector('.header');
const containerGame = document.querySelector('.container.game');
const contact_us = document.querySelector('.contact-us');
const startBtn = document.querySelector('.three');
const levels = {
    hard: ["fa-home", "fa-user", "fa-heart", "fa-search", "fa-envelope", "fa-phone", "fa-shopping-cart", "fa-lock", "fa-cog", "fa-graduation-cap", "fa-camera", "fa-music", "fa-map-marker", "fa-wrench", "fa-plane", "fa-globe", "fa-chess-pawn", "fa-chess-knight"],
    medium: ['fa-solid fa-music','fa-solid fa-bomb','fa-solid fa-face-smile-beam','fa-solid fa-ghost','fa-solid fa-fire','fa-solid fa-bicycle','fa-solid fa-circle-radiation','fa-solid fa-cat','fa-solid fa-user-graduate','fa-solid fa-dog','fa-solid fa-crown','fa-solid fa-sack-dollar'],
    easy: ['fa-brands fa-twitter', 'fa-brands fa-tiktok', 'fa-brands fa-discord', 'fa-brands fa-youtube', 'fa-brands fa-spotify', 'fa-brands fa-whatsapp', 'fa-brands fa-pinterest', 'fa-solid fa-user-secret']
}
const cardsContainer = document.querySelector('.cards');
const restartBtn = document.querySelector('.five');
let previousTitle = document.title;
let currentLevel;
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let test = 0;
let timer;
let seconds = 0;
let minutes = 0;

//GET NAME PLAYER
if (nombre) {
    mostrarNombre(nombre);
}
function mostrarNombre(nombre) {
    spanNombre.textContent = nombre;
}
playerBtn.addEventListener("click", function () {
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
        },
        didOpen: () => {
            pauseTimer();
        }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('nombre', result.value);
            mostrarNombre(result.value);
        } else {
            if (test > 0) {
                restartTimer();
            }
        }
    });
});
//HOW TO PLAY
hdpBtn.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'Como jugar',
        text: "El objetivo del Juego de 'Emparejado2' es que el jugador de la vuelta a pares de cartas iguales. En un turno, si el jugador elige dos cartas cuyos simbolos coincidan, se mostraran los simbolos emparejados. Sin embargo, si el jugador elige dos cartas con simbolos diferentes, ambas volveran a voltearse. El juego termina cuando se han descubierto todos los pares de cartas iguales.",
        confirmButtonText: '¡Entendido!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        didOpen: () => {
            pauseTimer();
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (test > 0) {
                restartTimer();
            }
        }
    });
});

//DROP-DOWN MENU FUNCTION AND OPACITY ITEMS
gearIconBtn.addEventListener('click', () => {
    setup_menu.classList.toggle('spread');
    if (setup_menu.classList.contains('spread')) {
        header.style.opacity = '0.7';
        containerGame.style.opacity = '0.7';
        contact_us.style.opacity = '0.7';
        pauseTimer();
    } else {
        header.style.opacity = '1';
        containerGame.style.opacity = '1';
        contact_us.style.opacity = '1';
        if (test > 0) {
            restartTimer();
        }
    }
});
window.addEventListener('click', e => {
    if (setup_menu.classList.contains('spread') && e.target != setup_menu && e.target != gearIconBtn) {
        setup_menu.classList.remove('spread');
        header.style.opacity = '1';
        containerGame.style.opacity = '1';
        contact_us.style.opacity = '1';
        if (test > 0) {
            restartTimer();
        }
    }
});

//DYNAMIC PAGE TITLE
window.addEventListener('blur', () => {
    previousTitle = document.title
    document.title = '¡No te vayas! ¡Sigue jugando! 🧩'
})
window.addEventListener('focus', () => {
    document.title = previousTitle
})

//FUNCTION TO SELECT LEVEL
function selectLevel() {
    const levels = ["easy", "medium", "hard"];
    Swal.fire({
        title: "Selecciona un nivel",
        html:
            '<div class="select">' +
            '<select id="my-select" class="my-select-class">' +
            '<option value="" >Selecciona un nivel</option>' +
            '<option value="easy">Facil</option>' +
            '<option value="medium">Medio</option>' +
            '<option value="hard">Dificil</option>' +
            '</select>' +
            "</div>",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        customClass: {
            confirmButton: 'swal2-confirm'
        },
        preConfirm: () => {
            const selectValue = document.getElementById("my-select").value;
            if (!selectValue || !levels.includes(selectValue)) {
                Swal.showValidationMessage("Por favor, selecciona un nivel");
            }
            return selectValue;
        },
        didOpen: () => {
            pauseTimer();
        }
    }).then((result) => {
        if (result.isConfirmed) {
            currentLevel = result.value;
            createCardDiv(currentLevel);
        } else {
            if (test > 0) {
                restartTimer();
            }
        }
    });
}
startBtn.addEventListener('click', () => { //EVENT FOR BTN SELECT LEVEL
    selectLevel();
});
window.addEventListener('load', function () { //AS SOON AS THE PAGE LOADS
    selectLevel();
});

//FUNCTION TO CREATE CARDS DYNAMICALLY
function createCardDiv(currentLevel) {
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
        clearInterval(timer);
        flippedCards = [];
        matchedCards = 0;
        moves = 0;
        seconds = 0;
        minutes = 0;
        test = 0;
        timer = null;
        document.querySelector('.timer-minutes').textContent = '00';
        document.querySelector('.timer-seconds').textContent = '00';
        document.querySelector('.moves').textContent = '0';
    }
    const cards = levels[currentLevel];
    const shuffledCards = cards.concat(cards).sort(() => Math.random() - 0.5);
    shuffledCards.forEach((card) => {
        const newDiv = `
            <div class="card-${currentLevel}">
                <div class="view front-view">
                    <span class="front-icon ${currentLevel}"><i class="fa-solid fa-question"></i></span>
                </div>
                <div class="view back-view" >
                    <span class="back-icon ${currentLevel}"><i class="${card}" data-icon="${card}"></i></span>
                </div>
            </div>
        `;
        cardsContainer.innerHTML += newDiv;
    });
}

//FUNCTION TO RUN THE GAME
function flipCard(event) {
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
            }, 8000);
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
                            text: `¡Has encontrado todas las parejas en un tiempo de ${minutes} minutos con ${seconds} segundos, usaste ${moves} movimientos!`,
                            showCancelButton: true,
                            confirmButtonText: 'Reiniciar',
                            cancelButtonText: 'Cambiar dificultad',
                            imageUrl: '/Img/success.gif',
                            imageWidth: 400,
                            imageHeight: 150,
                            imageAlt: 'GIF de felicitaciones',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            allowEnterKey: false,
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                restartGame();
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
cardsContainer.addEventListener('click', flipCard);

//FUNCTION TO CONTROL THE TIME
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    document.querySelector('.timer-minutes').textContent = padNumber(minutes);
    document.querySelector('.timer-seconds').textContent = padNumber(seconds);

}
//AUXILIARY FUNCTION FOR MINUTES AND SECONDS TO BE DISPLAYED IN "00" FORMAT ON THE TIMER.
function padNumber(number) {
    return String(number).padStart(2, '0');
}

//FUNCTION TO PAUSE GAME TIME
function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

//FUNCTION TO RESTART GAME TIME
function restartTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}
//FUNCTION TO PAUSE THE TIME IF THE WINDOW IS NOT ACTIVE
function handleVisibilityChange() {
    if (document.hidden) {
        pauseTimer();
    } else {
        if (test > 0) {
            restartTimer();
        }
    }
}
document.addEventListener("visibilitychange", handleVisibilityChange);

//FUNCTION FOR THE BUTTON "RESTART GAME"
function restartGame() {
    clearInterval(timer);
    flippedCards = [];
    matchedCards = 0;
    moves = 0;
    seconds = 0;
    minutes = 0;
    test = 0;
    timer = null;
    document.querySelector('.timer-minutes').textContent = '00';
    document.querySelector('.timer-seconds').textContent = '00';
    document.querySelector('.moves').textContent = '0';
    const cards = document.querySelectorAll('.card-' + currentLevel);
    cards.forEach(card => {
        card.classList.remove('back-view', 'matched');
    });
    createCardDiv(currentLevel);
}
restartBtn.addEventListener("click", restartGame);