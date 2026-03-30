const API_URL = "https://mon-api-mmlc.onrender.com";

async function updateStatus() {
    try {
        const res = await fetch(`${API_URL}/status`);
        const data = await res.json();

        const count = data.count;

        const text = count === 0
            ? "Aucun appareil connecté"
            : `Appareil(s) connecté(s) : ${count}`;

        const bar = document.getElementById("status-bar");
        const circle = document.querySelector(".circle");

        document.getElementById("text").innerText = text;

        if (count === 0) {
            bar.className = "status-red";
            circle.style.background = "red";
        } else {
            bar.className = "status-green";
            circle.style.background = "green";
        }

    } catch (e) {
        console.error(e);
    }
}

setInterval(updateStatus, 2000);
updateStatus();
