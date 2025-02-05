window.onload = function() {
    setTimeout(() => {
        try {
            if (document.querySelector(".container") && document.querySelector(".nuke-button")) {
                document.getElementById("loadingScreen").style.display = "none";
            } else {
                document.getElementById("loadingScreen").innerHTML = `<div class="loading-message">Website down, please wait for next update.</div>`;
            }
        } catch (e) {
            document.getElementById("loadingScreen").innerHTML = `<div class="loading-message">Website down, please wait for next update.</div>`;
        }
    }, 2000);
};

document.getElementById("nukeButton").addEventListener("click", function() {
    const webhookUrl = document.getElementById("webhookUrl").value;
    const pingRole = document.getElementById("pingRole").value;
    const customMessage = document.getElementById("customMessage").value;
    const times = parseInt(document.getElementById("times").value);

    document.getElementById("message").textContent = "";

    if (isValidUrl(webhookUrl)) {
        document.getElementById("message").textContent = `Sending ${times} webhooks...`;
        document.getElementById("message").style.color = "#00FF00";

        for (let i = 0; i < times; i++) {
            sendWebhook(webhookUrl, pingRole, customMessage, i + 1);
        }
    } else {
        document.getElementById("message").textContent = "Invalid webhook URL!";
        document.getElementById("message").style.color = "#FF5733";
    }
});

document.getElementById("deleteWebhookButton").addEventListener("click", function() {
    const webhookUrl = document.getElementById("webhookUrl").value;
    const botToken = document.getElementById("botToken").value;

    if (isValidUrl(webhookUrl) && botToken) {
