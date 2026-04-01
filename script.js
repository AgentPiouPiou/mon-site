const socket = io("https://mon-api-mmlc.onrender.com", {
    transports: ["websocket"]
});

const container = document.getElementById("screens-container");
const toggleBtn = document.getElementById("toggle-controls");
const controls = document.getElementById("controls");

let imgs = [];

// toggle contrôles
toggleBtn.onclick = () => {
    controls.classList.toggle("hidden");
};

socket.on("frames", (data) => {

    const frames = data.frames;
    const layout = data.layout;

    // init images
    if (imgs.length === 0) {
        container.innerHTML = "";

        frames.forEach((_, i) => {
            const img = document.createElement("img");
            img.className = "screen";
            container.appendChild(img);
            imgs.push(img);
        });
    }

    // calcul offset global (pour garder positions relatives)
    let minLeft = Math.min(...layout.map(l => l.left));
    let minTop = Math.min(...layout.map(l => l.top));

    frames.forEach((frame, i) => {
        const img = imgs[i];
        const l = layout[i];

        img.src = "data:image/webp;base64," + frame;

        img.style.left = (l.left - minLeft) + "px";
        img.style.top = (l.top - minTop) + "px";
        img.style.width = l.width + "px";
        img.style.height = l.height + "px";
    });
});
