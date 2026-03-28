function sendCommand(action, value) {
    fetch("https://mon-api-mmlc.onrender.com/set-command", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: action,
            value: value
        })
    })
}
