"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// TUS IMAGENES (Links 1 al 6)
const images = [
  "https://i.imgur.com/TL3lwbV.jpeg",
  "https://i.imgur.com/iUgN9E3.jpeg",
  "https://i.imgur.com/mN3OkTV.jpeg",
  "https://i.imgur.com/aZ3zWBk.jpeg",
  "https://i.imgur.com/VukKvyM.jpeg",
  "https://i.imgur.com/BSkVGLM.jpeg"
];

// TU IMAGEN FINAL (Link 7)
const finalImage = "https://i.imgur.com/TrvihNT.jpeg";

let noCount = 0;

// Acción del botón SÍ
yesButton.addEventListener("click", handleYesClick);

// Acción del botón NO (Hacer crecer el SÍ)
noButton.addEventListener("click", function () {
  noCount++;
  
  // 1. Cambiar imagen (bucle infinito)
  const imageIndex = noCount % images.length;
  catImg.src = images[imageIndex];
  
  // 2. Agrandar el botón SÍ
  resizeYesButton();
  
  // 3. Cambiar texto del NO
  updateNoButtonText();
});

function handleYesClick() {
  titleElement.innerHTML = "¡Siiuuu! Prometo que esta vez sale de 10 ❤️";
  buttonsContainer.classList.add("hidden");
  catImg.src = finalImage;
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  
  // Multiplicamos el tamaño por 1.8 en cada click. Crece muy rápido.
  const newFontSize = fontSize * 1.8;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "¿Segura?",
    "¡Por favor!",
    "Dale, ayer estaba nervioso",
    "No me hagas esto :(",
    "¡Se me rompe el corazón!",
    "Voy a llorar...",
    "No seas mala",
    "¡Apretá el verde!",
    "No tenés otra opción jaja"
  ];

  const messageIndex = noCount % messages.length;
  return messages[messageIndex];
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}