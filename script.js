"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// --- TUS IMÁGENES ---
const images = [
  "https://i.imgur.com/TL3lwbV.jpeg", // 1
  "https://i.imgur.com/iUgN9E3.jpeg", // 2
  "https://i.imgur.com/mN3OkTV.jpeg", // 3
  "https://i.imgur.com/aZ3zWBk.jpeg", // 4
  "https://i.imgur.com/VukKvyM.jpeg", // 5
  "https://i.imgur.com/BSkVGLM.jpeg"  // 6
];

// La imagen final (el SÍ):
const finalImage = "https://i.imgur.com/TrvihNT.jpeg";

let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

// Lógica para que el botón se escape (Mouse y Táctil)
noButton.addEventListener("mouseover", moverBoton);
noButton.addEventListener("touchstart", function (e) {
  e.preventDefault();
  moverBoton();
});
noButton.addEventListener("click", function (e) {
  e.preventDefault();
  moverBoton();
});

function moverBoton() {
  noCount++;
  
  // 1. Cambiar imagen (bucle infinito)
  const imageIndex = noCount % images.length;
  catImg.src = images[imageIndex];
  
  // 2. Cambiar texto
  updateNoButtonText();
  
  // 3. Mover botón a posición random
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  // Calculamos los límites para que no se salga de la pantalla
  const maxLeft = windowWidth - btnWidth - 20; 
  const maxTop = windowHeight - btnHeight - 20;

  const randomX = Math.random() * maxLeft;
  const randomY = Math.random() * maxTop;

  noButton.style.position = "absolute";
  noButton.style.left = `${Math.max(10, randomX)}px`;
  noButton.style.top = `${Math.max(10, randomY)}px`;
}

function handleYesClick() {
  titleElement.innerHTML = "¡Siiuuu! Prometo que esta vez sale de 10 ❤️";
  buttonsContainer.classList.add("hidden");
  catImg.src = finalImage; // Muestra la foto final
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

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}