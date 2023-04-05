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



/////////////////////////////////////////////
//Niveles de dificultad con los iconos

let easy = ["fa-home", "fa-user", "fa-heart", "fa-search", "fa-envelope", "fa-phone", "fa-shopping-cart", "fa-lock", "fa-cog", "fa-graduation-cap", "fa-camera", "fa-music", "fa-map-marker", "fa-wrench", "fa-plane", "fa-globe", "fa-chess-pawn", "fa-chess-knight"];


// calcular la cantidad total de elementos del array duplicado
const newArray = easy.concat(easy)
//Barajamos el array para que los pares no estén juntos
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
shuffleArray(newArray);
console.log(newArray);

// Seleccionamos los elementos del DOM
const cards = document.querySelectorAll('.card');

//Creamos un bucle para añadir nuevos elementos
for (let i = 0; i < cards.length; i++) {
    // Crear etiquetas div,span y i
    const newDiv = document.createElement('div');
    const newSpan = document.createElement('span');
    const newI = document.createElement('i');
    // Se agrega las clases a las etiquetas
    newDiv.classList.add("view", "back-view");
    newSpan.classList.add("back-icon");
    newI.classList.add("icon", "fa-solid");

    // Agregar el span como hijo del div y a la etiqueta i como hijo span
    newDiv.appendChild(newSpan);
    newSpan.appendChild(newI)
    cards[i].appendChild(newDiv);
}

// Selecionamos los elementos del DOM
const icons = document.querySelectorAll('.icon');
// Realizamos un buvle para poner los iconos en cada casilla
for (let i = 0; i < newArray.length; i++) {
    icons[i].classList.add(newArray[i]);
    cards[i].setAttribute("data-icon", newArray[i]);
}

/////////////////////////////////////////////////////////



let flippedCards = [];
let matchedCards = 0;
let moves = 0; // Variable para llevar el registro de los movimientos del usuario
let test = 0; // Variable para controlar el menu desplegable *testear*

function voltearCarta() {

    if (!this.classList.contains("matched") && flippedCards.length < 2) { // Verifica que la carta no esté ya emparejada y que no haya más de 2 cartas volteadas
        test++
        console.log(test)
        if (flippedCards.length === 0 && !timer) { // Si no hay ninguna carta volteada y no se ha iniciado el contador de tiempo

            restartTimer();
        }


        this.classList.toggle("back-view"); // Voltea la carta seleccionada
        flippedCards.push(this); // Añade la carta volteada al arreglo "flippedCards"
        console.log(flippedCards)

        if (flippedCards.length === 2) { // Cuando se han volteado 2 cartas
            moves++; // Aumenta el contador de movimientos
            const icon1 = flippedCards[0].dataset.icon; // Obtiene el ícono de la primera carta volteada
            const icon2 = flippedCards[1].dataset.icon; // Obtiene el ícono de la segunda carta volteada

            if (icon1 === icon2) { // Si los íconos de las dos cartas son iguales
                matchedCards++; // Aumenta el contador de cartas emparejadas
                flippedCards[0].classList.add("matched"); // Añade la clase "matched" a la primera carta volteada
                flippedCards[1].classList.add("matched"); // Añade la clase "matched" a la segunda carta volteada
                flippedCards = []; // Reinicia el arreglo de cartas volteadas

                if (matchedCards === cards.length / 2) { // Si se han emparejado todas las cartas
                    clearInterval(timer); // Detiene el contador de tiempo
                    alert(`¡Has encontrado todas las parejas en ${minutes}:${seconds}, usaste ${moves} movimientos!`); // Muestra un mensaje con el tiempo y los movimientos realizados
                }
            } else { // Si los íconos de las dos cartas no son iguales
                setTimeout(() => {
                    flippedCards[0].classList.toggle("back-view"); // Vuelve a voltear la primera carta
                    flippedCards[1].classList.toggle("back-view"); // Vuelve a voltear la segunda carta
                    flippedCards = []; // Reinicia el arreglo de cartas volteadas
                }, 1000); // Espera 1 segundo (1000 ms) antes de voltear las cartas de nuevo
            }
        }
        document.querySelector('.moves').textContent = moves;
    }
}

cards.forEach(card => card.addEventListener("click", voltearCarta));





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



// Detectar cuando la ventana no está activa
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        pauseTimer(); // Pausar el contador de tiempo cuando la ventana no está activa
    } else  {
    // Reiniciar el contador de tiempo cuando la ventana vuelve a estar activa
        if (test >= 1) {
            restartTimer();
        }
    }
});


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
    cards.forEach(card => {
        card.classList.remove("matched");
        card.classList.remove("back-view");
    });
}
