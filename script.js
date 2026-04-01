const socket = io("https://mon-api-mmlc.onrender.com", {
    transports: ["websocket"]
});

const container = document.getElementById("screens-container");
const fullscreenBtn = document.getElementById("fullscreen-btn");

let imgs = [];

socket.on("frames", (frames) => {

    // créer images une seule fois
    if (imgs.length === 0) {
        container.innerHTML = "";

        frames.forEach(() => {
            const img = document.createElement("img");
            img.className = "screen";
            container.appendChild(img);
            imgs.push(img);
        });
    }

    // update sans recréer DOM (ULTRA IMPORTANT)
    frames.forEach((frame, i) => {
        imgs[i].src = "data:image/webp;base64," + frame;
    });
});


// 📱 plein écran + rotation
fullscreenBtn.addEventListener("click", async () => {
    if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();

        // force paysage mobile
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock("landscape").catch(() => {});
        }

    } else {
        document.exitFullscreen();
    }
});


// 🎮 joystick fake (UI)
const joystick = document.getElementById("joystick");

joystick.addEventListener("touchmove", (e) => {
    e.preventDefault();
    // ici tu peux envoyer direction au serveur si tu veux plus tard
});

// boutons
document.getElementById("left-click").onclick = () => {
    console.log("click gauche");
};

document.getElementById("right-click").onclick = () => {
    console.log("click droit");
};
