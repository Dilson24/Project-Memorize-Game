
//const easy = ["fa-chess-pawn", "fa-chess-knight", "fa-chess-bishop", "fa-chess-rook", "fa-chess-queen", "fa-chess-king", "fa-heart", "fa-star", "fa-sun", "fa-moon", "fa-snowflake", "fa-umbrella", "fa-anchor", "fa-bomb", "fa-bolt", "fa-cloud"];
const medium = ["fa-adjust", "fa-briefcase", "fa-camera", "fa-database", "fa-envelope", "fa-file", "fa-gift", "fa-heart", "fa-key", "fa-lock", "fa-map-marker", "fa-pencil", "fa-search", "fa-star", "fa-thumbs-up", "fa-user"];
const hard = ["fas fa-home", "fas fa-user", "fas fa-heart", "fas fa-search", "fas fa-envelope", "fas fa-phone", "fas fa-shopping-cart", "fas fa-lock", "fas fa-cog", "fas fa-graduation-cap", "fas fa-camera", "fas fa-music", "fas fa-map-marker", "fas fa-wrench", "fas fa-plane", "fas fa-globe"];

const LEVELS = [
    easy,
    medium,
    hard
];

const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = 0;
let moves = 0; // Variable para llevar el registro de los movimientos del usuario

function voltearCarta() {
    if (flippedCards.length < 2 && !this.classList.contains("matched")) {
        this.classList.toggle("back-view");
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            moves++; // Incrementar el contador de movimientos
            const icon1 = flippedCards[0].dataset.icon;
            const icon2 = flippedCards[1].dataset.icon;
            if (icon1 === icon2) {
                matchedCards++;
                flippedCards.forEach(card => card.classList.add("matched")); // Agregar clase "matched" a las cartas encontradas
                flippedCards = [];
                if (matchedCards === cards.length / 2) {
                    alert(`¡Has encontrado todas las parejas en ${moves} movimientos!`);
                }
            } else {
                setTimeout(() => {
                    flippedCards[0].classList.toggle("back-view");
                    flippedCards[1].classList.toggle("back-view");
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}

cards.forEach(card => card.addEventListener("click", voltearCarta));
