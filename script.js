const socket = io("https://mon-api-mmlc.onrender.com", {
    transports: ["websocket"]
});

const text = document.getElementById("text");
const card = document.getElementById("card");

socket.on("status", (data) => {
    if (data.connected) {
        text.innerText = "Appareil connecté";
        card.className = "card green";
    } else {
        text.innerText = "Aucun appareil connecté";
        card.className = "card red";
    }
});
