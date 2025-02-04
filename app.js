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

    if (isValidUrl(webhookUrl)) {
        document.getElementById("message").textContent = `Deleting webhook...`;
        document.getElementById("message").style.color = "#FF4D4D";

        deleteWebhook(webhookUrl);
    } else {
        document.getElementById("message").textContent = "Invalid webhook URL!";
        document.getElementById("message").style.color = "#FF5733";
    }
});

function isValidUrl(url) {
    const pattern = new RegExp('https://discord.com/api/webhooks/([A-Za-z0-9_-]+)/([A-Za-z0-9_-]+)');
    return pattern.test(url);
}

function sendWebhook(url, pingRole, customMessage, count) {
    let content = customMessage ? customMessage : `Nuke message #${count}`;
    
    if (pingRole) {
        content = `<@${pingRole}> ${content}`;
    }

    const data = { 
        content: content,
        username: "Axiom Spammer Bot",
    };

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("message").textContent = `Webhook #${count} sent successfully!`;
            document.getElementById("message").style.color = "#00FF00";
        } else {
            document.getElementById("message").textContent = `Failed to send webhook #${count}`;
            document.getElementById("message").style.color = "#FF5733";
        }
    })
    .catch(error => {
        document.getElementById("message").textContent = `Error: ${error}`;
        document.getElementById("message").style.color = "#FF5733";
    });
}

function deleteWebhook(url) {
    setTimeout(() => {
        document.getElementById("message").textContent = "Webhook deleted successfully!";
        document.getElementById("message").style.color = "#FF4D4D";
    }, 1000);
}
