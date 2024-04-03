const notificationContainer = document.createElement("div");
notificationContainer.classList.add("notification-container");
document.body.prepend(notificationContainer);

const showNotification = (title, message, time = 3000, error = false) => {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    const titleElement = document.createElement("h3");
    titleElement.textContent = title;
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    notification.appendChild(titleElement);
    notification.appendChild(messageElement);
    notification.dataset.type = error ? "error" : "info";
    notificationContainer.appendChild(notification);

    const remove = () => {
        notification.dataset.removing = true;
        setTimeout(() => notification.remove(), 1000);
    }

    const remover = setTimeout(() => remove(), time);

    notification.addEventListener("click", () => {
        clearTimeout(remover);
        remove();
    });
}

const queries = new URLSearchParams(window.location.search);
const description = queries.get("notification-message");
const title = queries.get("notification-title") || "Notification";
if (description) {
    showNotification(title, description, 5000, queries.get("notification-type") === "error");
}

queries.delete("notification-message");
queries.delete("notification-title");
queries.delete("notification-type");

const newUrl = `${window.location.pathname}${queries.toString() ? `?${queries.toString()}` : ""}`;
window.history.replaceState({}, document.title, newUrl);