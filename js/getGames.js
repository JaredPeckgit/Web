const API_URL = "https://api-ih62.onrender.com/api/v1/games";

fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const formattedData = data.map(game => [
            game.id,
            game.title,
            game.year,
            game.platform
        ]);
        
        new gridjs.Grid({
            columns: ["ID", "Title", "Year", "Platform"],
            data: formattedData,
            search: true,
            sort: true,
            pagination: {
                enabled: true,
                limit: 5
            },
            resizable: true,
            style: {
                table: {
                    border: "1px solid #D3D3D3", 
                    "background-color": "#2C2F33" 
                },
                th: {
                    "background-color": "#1E90FF",
                    color: "#FFFFFF", 
                    "text-align": "left",
                    "font-weight": "bold",
                    padding: "10px" 
                },
                td: {
                    padding: "8px",
                    "border-bottom": "1px solid #D3D3D3", 
                    color: "#D3D3D3", 
                    "background-color": "#2C2F33" 
                },
               
                container: {
                    "background-color": "#2C2F33",
                    color: "#D3D3D3"
                },
                pagination: {
                    "background-color": "#2C2F33",
                    color: "#D3D3D3"
                },
                paginationButton: {
                    "background-color": "#1E90FF",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "5px 10px",
                    "margin": "0 2px",
                    "border-radius": "3px"
                },
                search: {
                    "background-color": "#2C2F33",
                    color: "#D3D3D3",
                    border: "1px solid #D3D3D3",
                    padding: "5px"
                }
            }
        }).render(document.getElementById("grid-container"));
    })
    .catch(error => {
        console.error("Error fetching games:", error);
    });