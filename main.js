let currentIndex = 0;  
const duration = 5000; // 5 segundos para a transição de imagens  

// Conjunto de todas as imagens  
const images = [   
    "img/01.webp",  
    "img/02.webp",  
    "img/03.webp",  
    "img/04.webp",  
    "img/05.webp",  
    "img/06.webp",  
    "img/07.webp",  
    "img/08.webp",  
    "img/09.webp",  
    "img/10.webp",  
    "img/11.webp",  
    "img/12.webp",  
    "img/13.webp",  
    "img/14.webp",  
    "img/15.webp",  
    "img/16.webp",  
    "img/17.webp",  
    "img/18.webp",  
    "img/19.webp",  
    "img/20.webp",  
    "img/21.webp",  
    "img/22.webp",  
    "img/23.webp",  
    "img/24.webp",  
    "img/25.webp",  
    "img/26.jpg",  
    "img/27.jpg",  
    "img/28.jpg",  
    "img/29.jpg",  
    "img/30.jpg",  
    "img/31.jpg",  
    "img/32.jpg",  
    "img/33.jpg",  
    "img/34.jpg",  
    "img/35.jpg",  
    "img/36.jpg"  
];  

// Lista de músicas  
const musicas = [  
    'sound/01.mp3',  
    'sound/02.mp3',  
    'sound/03.mp3',  
    'sound/04.mp3',  
    'sound/05.mp3',  
    'sound/06.mp3',  
    'sound/07.mp3',  
    'sound/08.mp3',  
    'sound/09.mp3',  
    'sound/10.mp3'  
];  

// Variável para o player de áudio  
const audioPlayer = document.getElementById('audioPlayer');  

// Função para tocar música aleatória se ainda não estiver tocando  
function tocarMusicaAleatoria() {   
    if (audioPlayer.paused) {  
        const randomIndex = Math.floor(Math.random() * musicas.length);  
        audioPlayer.src = musicas[randomIndex];  
        audioPlayer.play();  
    }   
}  

// Função para mostrar um conjunto de 6 imagens (3 de cada lado)  
function showFullSet() {  
    const leftContainer = document.querySelector('.photos.left .carousel');  
    const rightContainer = document.querySelector('.photos.right .carousel');  

    leftContainer.innerHTML = ""; // Limpa antes de adicionar novas imagens  
    rightContainer.innerHTML = ""; // Limpa antes de adicionar novas imagens  

    // Adiciona 3 imagens no lado esquerdo  
    for (let i = 0; i < 3; i++) {  
        const img = document.createElement('img');  
        img.src = images[currentIndex + i];  
        img.alt = `Imagem ${currentIndex + i + 1}`;  
        img.style.opacity = 0; // Inicia com opacidade 0 para transição  
        img.classList.add('expandable'); // Adiciona uma classe para controlar a expansão  
        leftContainer.appendChild(img);  
        setTimeout(() => { img.style.opacity = 1; }, 100);  
    }  

    // Adiciona 3 imagens no lado direito  
    for (let i = 3; i < 6; i++) {  
        const img = document.createElement('img');  
        img.src = images[currentIndex + i];  
        img.alt = `Imagem ${currentIndex + i + 1}`;  
        img.style.opacity = 0; // Inicia com opacidade 0 para transição  
        img.classList.add('expandable'); // Adiciona uma classe para controlar a expansão  
        rightContainer.appendChild(img);  
        setTimeout(() => { img.style.opacity = 1; }, 100);  
    }  

    // Adiciona eventos de clique para expansão/recolhimento  
    const expandableImages = document.querySelectorAll('.expandable');  
    expandableImages.forEach((img) => {  
        img.addEventListener('click', () => {  
            expandImage(img);  
        });  
    });  
}  

// Função para alternar as imagens a cada intervalo  
function toggleImages() {  
    currentIndex += 6; // Move para o próximo conjunto de 6 imagens  
    if (currentIndex >= images.length) {  
        currentIndex = 0; // Reseta para 0 se ultrapassar o total de imagens  
    }  
    showFullSet();  
    tocarMusicaAleatoria();  
}  

// Função para expandir a imagem clicada  
function expandImage(img) {  
    // Cria um overlay para escurecer o fundo  
    const overlay = document.createElement('div');  
    overlay.classList.add('overlay');  
    document.body.appendChild(overlay);  

    // Ajusta a imagem para se expandir  
    img.classList.add('expanded');   

    // Define um evento para fechar a imagem ao clicar fora  
    overlay.addEventListener('click', () => {  
        img.classList.remove('expanded');  
        document.body.removeChild(overlay); // Remove o overlay  
    });  
}  

showFullSet(); // Mostra as primeiras 6 imagens  
tocarMusicaAleatoria();  

setInterval(toggleImages, duration);  

// Contador de data  
const startDate = new Date("2023-04-28T00:00:00");  
const countDisplay = document.getElementById("countDisplay");  

function updateCounter() {  
    const now = new Date();  
    const elapsedTime = now - startDate;  

    const seconds = Math.floor((elapsedTime / 1000) % 60);  
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);  
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);  
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));  

    countDisplay.innerText = `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;  
}  

setInterval(updateCounter, 1000);  

// Controle de volume e progresso da música  
const volumeControl = document.getElementById('volumeControl');  
const prevTrackButton = document.getElementById('prevTrack');  
const nextTrackButton = document.getElementById('nextTrack');  
const trackProgress = document.getElementById('trackProgress');  
const progressFill = document.getElementById('progressFill');  

// Ajustar volume  
volumeControl.addEventListener('input', () => {  
    audioPlayer.volume = volumeControl.value;  
});  

// Tocar música anterior  
prevTrackButton.addEventListener('click', () => {  
    const currentIndex = musicas.indexOf(audioPlayer.src.split('/').pop());  
    const newIndex = (currentIndex - 1 + musicas.length) % musicas.length;  
    audioPlayer.src = musicas[newIndex];  
    audioPlayer.play();  
});  

// Tocar próxima música  
nextTrackButton.addEventListener('click', () => {  
    const currentIndex = musicas.indexOf(audioPlayer.src.split('/').pop());  
    const newIndex = (currentIndex + 1) % musicas.length;  
    audioPlayer.src = musicas[newIndex];  
    audioPlayer.play();  
});  

audioPlayer.addEventListener('timeupdate', () => {  
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;  
    progressFill.style.width = `${progress}%`;  
});  

audioPlayer.addEventListener('ended', () => {  
    progressFill.style.width = '0%'; // Resetar a barra de progresso  
});  

// Ajustes específicos para dispositivos móveis  
if (window.innerWidth <= 768) {  
    // Define o número de imagens a serem mostradas de uma vez  
    const numImagesToShow = 3;  

    // Atualiza as funções para controlar as transições específicas para dispositivos móveis  
    function showFullSetMobile() {  
        const container = document.querySelector('.carousel');  
        container.innerHTML = ""; // Limpa as imagens atuais  

        for (let i = 0; i < numImagesToShow; i++) {  
            if (currentIndex + i < images.length) {  
                const img = document.createElement('img');  
                img.src = images[currentIndex + i];  
                img.alt = `Imagem ${currentIndex + i + 1}`;  
                img.style.opacity = 0; // Inicia com opacidade 0  
                img.classList.add('expandable');  
                container.appendChild(img);  
                setTimeout(() => { img.style.opacity = 1; }, 100); // Transição suave  
            }  
        }  

        // Configuração de clique para expandir a imagem  
        const expandableImages = document.querySelectorAll('.expandable');  
        expandableImages.forEach((img) => {  
            img.addEventListener('click', () => {  
                expandImage(img);  
            });  
        });  
    }  

    // Atualiza para o modo mobile  
    function toggleImagesMobile() {  
        currentIndex += numImagesToShow; // Move para o próximo conjunto  
        if (currentIndex >= images.length) {  
            currentIndex = 0; // Reseta para 0 se ultrapassar  
        }  
        showFullSetMobile(); // Atualiza o carrossel  
        tocarMusicaAleatoria(); // Toca uma música aleatória  
    }  

    // Chama as funções mobile  
    showFullSetMobile(); // Mostra as imagens iniciais  
    setInterval(toggleImagesMobile, duration); // Alterna as imagens  
} else {  
    // Chama as funções para desktop  
    showFullSet(); // Mostra as primeiras 6 imagens  
    tocarMusicaAleatoria();  
    setInterval(toggleImages, duration); // Alterna as imagens  
}