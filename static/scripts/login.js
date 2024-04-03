document.getElementById("login").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then(res => {
        if (res.status !== 200) {
            res.text().then(text => {
                showNotification("Error Occurred", text, 3000, true);
            });
            console.error(res);
        } else {
            res.json().then(data => {
                document.cookie = `token=${data.token}`;
                window.location.href = "/search";
            });
        }
    })
})