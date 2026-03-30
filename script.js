const socket = io("https://mon-api-mmlc.onrender.com", {
    transports: ["websocket"]
});

const text = document.getElementById("text");
const card = document.getElementById("card");

socket.on("connect", () => {
    console.log("Connecté au serveur");
});

socket.on("update", (data) => {
    const count = data.count;

    if (count === 0) {
        text.innerText = "Aucun appareil connecté";
        card.className = "card red";
    } else {
        text.innerText = `Appareil(s) connecté(s) : ${count}`;
        card.className = "card green";
    }
});
