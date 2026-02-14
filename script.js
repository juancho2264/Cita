"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// Cambiá esto según tus fotos (cat-0.jpg hasta cat-X.jpg)
const MAX_IMAGES = 5;

let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

// --- LÓGICA ESCAPISTA ---

// 1. PC: Mouse pasa por encima
noButton.addEventListener("mouseover", moverBoton);

// 2. CELULAR: Dedo toca la pantalla (touchstart es más rápido que click)
noButton.addEventListener("touchstart", function (e) {
  e.preventDefault(); // Evita el click fantasma
  moverBoton();
});

// 3. Fallback (por si acaso)
noButton.addEventListener("click", function (e) {
  e.preventDefault();
  moverBoton();
});

function moverBoton() {
  noCount++;
  
  // Cambiar imagen y texto
  const imageIndex = noCount % MAX_IMAGES;
  changeImage(imageIndex);
  updateNoButtonText();
  
  // --- CÁLCULO DE POSICIÓN ---
  
  // Obtenemos ancho y alto de la ventana visible
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  // Obtenemos ancho y alto del botón
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  // Calculamos una posición random pero restando el tamaño del botón
  // para que no quede pegado al borde o medio cortado.
  // El Math.max(0, ...) asegura que no de negativo.
  const maxLeft = windowWidth - btnWidth - 20; // 20px de margen derecho
  const maxTop = windowHeight - btnHeight - 20; // 20px de margen inferior

  const randomX = Math.random() * maxLeft;
  const randomY = Math.random() * maxTop;

  // Aplicamos el movimiento
  noButton.style.position = "absolute"; // Se sale del flujo normal
  noButton.style.left = `${Math.max(10, randomX)}px`; // Mínimo 10px de margen izquierdo
  noButton.style.top = `${Math.max(10, randomY)}px`; // Mínimo 10px de margen superior
}

function handleYesClick() {
  titleElement.innerHTML = "¡Siiuuu! Prometo que esta vez sale de 10 ❤️";
  buttonsContainer.classList.add("hidden");
  changeImage("yes"); // Acordate de la foto cat-yes.jpg
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "¡Ups!",
    "¡Muy lenta!",
    "Dale, atrapame",
    "Ayer estaba nervioso :(",
    "¡No te dejás!",
    "Voy a llorar...",
    "¿Por qué sos así?",
    "La revancha vale la pena",
    "¡Dale al verde!",
    "Jaja no podés",
    "No hay opción 'No' hoy"
  ];

  const messageIndex = noCount % messages.length;
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}