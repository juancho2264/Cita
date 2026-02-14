"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

// TUS IMÁGENES (Links 1 al 6 para la secuencia del NO)
const images = [
  "https://i.imgur.com/TL3lwbV.jpeg",
  "https://i.imgur.com/iUgN9E3.jpeg",
  "https://i.imgur.com/mN3OkTV.jpeg",
  "https://i.imgur.com/aZ3zWBk.jpeg",
  "https://i.imgur.com/VukKvyM.jpeg",
  "https://i.imgur.com/BSkVGLM.jpeg"
];

// TU IMAGEN FINAL (Link 7 - Cuando dice que SÍ)
const finalImage = "https://i.imgur.com/TrvihNT.jpeg";

let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

// LÓGICA DEL BOTÓN ESCAPISTA (PC y CELULAR)

// 1. Mouse pasa por encima (PC)
noButton.addEventListener("mouseover", moverBoton);

// 2. Tocar la pantalla (Celular)
noButton.addEventListener("touchstart", function (e) {
  e.preventDefault(); // Evita que se haga click real
  moverBoton();
});

// 3. Click (Seguridad extra)
noButton.addEventListener("click", function (e) {
  e.preventDefault();
  moverBoton();
});

function moverBoton() {
  noCount++;
  
  // A. Cambiar imagen (bucle infinito)
  const imageIndex = noCount % images.length;
  catImg.src = images[imageIndex];
  
  // B. Cambiar texto
  updateNoButtonText();
  
  // C. Mover botón (Cálculo matemático para que no se salga de la pantalla)
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const btnWidth = noButton.offsetWidth;
  const btnHeight = noButton.offsetHeight;

  // Calculamos el espacio disponible restando el tamaño del botón y un margen (20px)
  const maxLeft = windowWidth - btnWidth - 20; 
  const maxTop = windowHeight - btnHeight - 20;

  // Generamos posición aleatoria
  const randomX = Math.random() * maxLeft;
  const randomY = Math.random() * maxTop;

  // Aplicamos la nueva posición
  noButton.style.position = "absolute";
  noButton.style.left = `${Math.max(10, randomX)}px`; // Mínimo 10px del borde
  noButton.style.top = `${Math.max(10, randomY)}px`;
}

function handleYesClick() {
  // Mensaje final
  titleElement.innerHTML = "¡Siiuuu! Prometo que esta vez sale de 10 ❤️";
  buttonsContainer.classList.add("hidden");
  
  // Mostrar la foto final (Link 7)
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