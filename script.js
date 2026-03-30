const API = "https://mon-api-mmlc.onrender.com/count";

async function updateStatus() {
    const debugBox = document.getElementById("debug");

    try {
        const res = await fetch(API + "?t=" + Date.now(), {
            cache: "no-store"
        });

        const data = await res.json();

        // 🔻 affichage brut API
        debugBox.innerText = "API : " + JSON.stringify(data);

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
                <span>Aucun appareil connecté</span>
            `;
        }

    } catch (err) {
        debugBox.innerText = "Erreur API : " + err;

        const card = document.getElementById("status");
        card.className = "card offline";
        card.innerHTML = `
            <div class="dot red"></div>
            <span>API inaccessible</span>
        `;
    }
}

// 🔁 refresh toutes les secondes
setInterval(updateStatus, 1000);
updateStatus();
