const socket = io("https://mon-api-mmlc.onrender.com", {
    transports: ["websocket"]
});

const text = document.getElementById("text");
const card = document.getElementById("card");
const container = document.getElementById("screens-container");
const fullscreenBtn = document.getElementById("fullscreen-btn");

let lastUpdate = 0;
const FPS_LIMIT = 10;

socket.on("update", (data) => {
    if (data.connected) {
        text.innerText = "Appareil connecté";
        card.className = "card green";
    } else {
        text.innerText = "Aucun appareil connecté";
        card.className = "card red";
    }
});

socket.on("frames", (frames) => {
    const now = Date.now();

    if (now - lastUpdate < 1000 / FPS_LIMIT) return;
    lastUpdate = now;

    container.innerHTML = "";

    frames.forEach((frame) => {
        const img = document.createElement("img");
        img.src = "data:image/jpeg;base64," + frame;
        img.className = "screen";
        container.appendChild(img);
    });
});

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
