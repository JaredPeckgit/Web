// Function to show a Bootstrap toast
function showToast({ priority, title, message }) {
    const toastEl = document.getElementById("toastContainer");
    const toastTitleEl = document.getElementById("toastTitle");
    const toastMessageEl = document.getElementById("toastMessage");

    toastTitleEl.textContent = title;
    toastMessageEl.textContent = message;

    toastEl.className = "toast";
    if (priority === "success") {
        toastEl.classList.add("bg-success", "text-white");
    } else if (priority === "danger") {
        toastEl.classList.add("bg-danger", "text-white");
    }

    const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
    bsToast.show();
}

// Fetch game data when the "Fetch Game" button is clicked
document.addEventListener("DOMContentLoaded", () => {
    const fetchGameBtn = document.getElementById("fetchGameBtn");
    const idInput = document.getElementById("id");
    const titleInput = document.getElementById("title");
    const yearInput = document.getElementById("year");
    const platformInput = document.getElementById("platform");
    const submitBtn = document.querySelector(".submit-btn");

    fetchGameBtn.addEventListener("click", () => {
        const gameId = idInput.value.trim();
        console.log("Fetching game data for ID:", gameId);

        if (!gameId) {
            showToast({ priority: "danger", title: "Error", message: "Please enter a game ID." });
            return;
        }

        if (!/^\d+$/.test(gameId)) {
            showToast({ priority: "danger", title: "Error", message: "Game ID must be a number." });
            return;
        }

        fetch(`https://api-ih62.onrender.com/api/v1/games/${gameId}`)
            .then(res => {
                console.log("Fetch response status:", res.status);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(game => {
                console.log("Fetched game data:", game);
                titleInput.value = game.title;
                yearInput.value = game.year;
                platformInput.value = game.platform;

                titleInput.disabled = false;
                yearInput.disabled = false;
                platformInput.disabled = false;
                submitBtn.disabled = false;

                showToast({ priority: "success", title: "Success", message: "Game data loaded successfully!" });
            })
            .catch(error => {
                console.error("Error fetching game data:", error);
                showToast({ priority: "danger", title: "Error", message: "Failed to load game data. Please check the ID." });
            });
    });
});

// Handle form submission for updating the game
const formEl = document.querySelector(".form");
const submitBtn = document.querySelector(".submit-btn");

formEl.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    console.log("Form data on submit:", data);

    if (data.title === "" || data.year === "" || data.platform === "" || !data.id) {
        showToast({ priority: "danger", title: "Error", message: "Please fill in all fields." });
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Updating...";

    fetch(`https://api-ih62.onrender.com/api/v1/games/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: data.title,
            year: parseInt(data.year), // Convert year to a number
            platform: data.platform
        })
    })
    .then(res => {
        console.log("PUT response status:", res.status);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log("Game updated:", data);
        showToast({ priority: "success", title: "Game Updated", message: "The game has been updated successfully!" });
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    })
    .catch(error => {
        console.error("Error updating game:", error);
        showToast({ priority: "danger", title: "Error", message: "Failed to update the game: " + error.message });
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Update";
    });
});