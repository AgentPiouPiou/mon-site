const socket = io("https://mon-api-mmlc.onrender.com", {
    transports: ["websocket"]
});

socket.on("connect", () => {
    document.getElementById("text").innerText = "Connecté";
});

socket.on("update", (data) => {
    const count = data.count;

    const text = count === 0
        ? "Aucun appareil connecté"
        : `Appareil(s) connecté(s) : ${count}`;

    const card = document.getElementById("status-bar");

    document.getElementById("text").innerText = text;

    if (count === 0) {
        card.className = "card red";
    } else {
        card.className = "card green";
    }
});
