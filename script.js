const API = "https://mon-api-mmlc.onrender.com/count";

function log(message, type = "info") {
    const time = new Date().toLocaleTimeString();

    if (type === "error") {
        console.error(`[${time}] ❌ ${message}`);
    } else {
        console.log(`[${time}] ✅ ${message}`);
    }
}

async function updateStatus() {
    try {
        const res = await fetch(API);
        const data = await res.json();

        log("API reçue : " + JSON.stringify(data));

        const card = document.getElementById("status");

        if (data.count > 0) {
            card.className = "card online";
            card.innerHTML = `
                <div class="dot green"></div>
                <span>Appareil(s) en ligne : ${data.count}</span>
            `;
        } else {
            card.className = "card offline";
            card.innerHTML = `
                <div class="dot red"></div>
                <span>Aucun appareil en ligne</span>
            `;
        }

    } catch (e) {
        log("Erreur API : " + e, "error");
    }
}

// 🔁 actualisation en direct
setInterval(updateStatus, 1000);
updateStatus();
