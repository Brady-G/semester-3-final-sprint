const queryBox = document.getElementById("query");
const dbBox = document.getElementById("database");
const searchButton = document.getElementById("search");

const search = () => {
    const query = queryBox.value;
    const database = dbBox.value;
    window.location.href = `/search?q=${query}&db=${database}`;
};

searchButton.addEventListener("click", search);
queryBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        search();
    }
});

const queries = new URLSearchParams(window.location.search);
queryBox.value = queries.get("q") || "";
dbBox.value = queries.get("db") || "pg";