const API = "https://mon-api-mmlc.onrender.com/count";

function log(msg) {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${msg}`);
}

async function updateStatus() {
    try {
        const res = await fetch(API + "?t=" + Date.now(), {
            cache: "no-store"
        });

        const data = await res.json();

        log("Réponse API : " + JSON.stringify(data));

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

    } catch (err) {
        log("Erreur : " + err);

        const card = document.getElementById("status");
        card.className = "card offline";
        card.innerHTML = `
            <div class="dot red"></div>
            <span>Erreur API</span>
        `;
    }
}

// 🔁 mise à jour chaque seconde
setInterval(updateStatus, 1000);

// 🔁 premier appel immédiat
updateStatus();
