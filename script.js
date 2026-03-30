const socket = io("https://mon-api-mmlc.onrender.com");

const text = document.getElementById("text");
const card = document.getElementById("status-bar");

socket.on("connect", () => {
    text.innerText = "Connecté...";
});

socket.on("update", (data) => {
    const count = data.count;

    if (count === 0) {
        text.innerText = "Aucun appareil connecté";
        card.className = "status-card status-red";
    } else {
        text.innerText = `Appareil(s) connecté(s) : ${count}`;
        card.className = "status-card status-green";
    }
});
