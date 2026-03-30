const socket = io("https://mon-api-mmlc.onrender.com", {
    transports: ["websocket"]
});

const text = document.getElementById("text");
const card = document.getElementById("card");

socket.on("update", (data) => {
    const count = data.count;

    if (count === 0) {
        text.innerText = "Aucun appareil connecté";
        card.className = "card red";
    } else {
        text.innerText = `${count} Appareils sont Connectés`;
        card.className = "card green";
    }
});
