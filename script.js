"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// TUS IMAGENES (Del link 1 al 6)
// Se irán mostrando en orden cuando el botón se escape
const images = [
  "https://imgur.com/a/GujcD78#TL3lwbV",
  "https://imgur.com/a/GujcD78#iUgN9E3",
  "https://imgur.com/a/GujcD78#mN3OkTV",
  "https://imgur.com/a/GujcD78#aZ3zWBk",
  "https://imgur.com/a/GujcD78#VukKvyM",
  "https://imgur.com/a/GujcD78#BSkVGLM"
];

// TU IMAGEN FINAL (Link 7)
// Esta aparece solo cuando logre darle al SÍ
const finalImage = "https://imgur.com/a/GujcD78#TrvihNT";

let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

// --- LÓGICA DEL BOTÓN ESCAPISTA ---

// 1. PC: Mouse pasa por encima
noButton.addEventListener("mouseover", moverBoton);

// 2. CELULAR: Dedo toca la pantalla (touchstart)
// Usamos touchstart porque es más rápido que el click en móviles
noButton.addEventListener("touchstart", function (e) {
  e.preventDefault(); 
  moverBoton();
});

// 3. Click (por seguridad)
noButton.addEventListener("click", function (e) {
  e.preventDefault();
  moverBoton();
});

function moverBoton() {
  noCount++;
  
  // A. Cambiar imagen
  // Usa el operador % para volver a empezar si se acaban las fotos
  const imageIndex = noCount % images.length;
  catImg.src = images[imageIndex];
  
  // B. Cambiar texto del botón
  updateNoButtonText();
  
  // C. Mover el botón a una posición aleatoria
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  // Calculamos límites para que NO se salga de la pantalla
  // Restamos el tamaño del botón y un margen de 20px
  const maxLeft = windowWidth - btnWidth - 20; 
  const maxTop = windowHeight - btnHeight - 20;

  const randomX = Math.random() * maxLeft;
  const randomY = Math.random() * maxTop;

  noButton.style.position = "absolute";
  // Math.max asegura que no se vaya muy al borde izquierdo/superior
  noButton.style.left = `${Math.max(10, randomX)}px`;
  noButton.style.top = `${Math.max(10, randomY)}px`;
}

function handleYesClick() {
  titleElement.innerHTML = "¡Siiuuu! Prometo que esta vez sale de 10 ❤️";
  buttonsContainer.classList.add("hidden");
  
  // Muestra la foto final
  catImg.src = finalImage;
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