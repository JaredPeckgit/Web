const API_URL="https://api-ih62.onrender.com/api/v1/games";

fetch(API_URL);
.then(response => response.json())
.then(data => {
    const formattedData = data.map(games => [
        games.id,
        games.title,
        games.year,
        games.platform,

    ]);
    new gridjs.Grid({
        columns:["ID","Title","Year","Platform"],
        data: formattedData,
        search: true,
        sort: true,
        pagination: {
            enabled: true,
            limit: 5,

        },
        resizeable: true,
        style:{
            table:{
                boarder: "1px solid #ccc"
            },
            th: {
                "background-color": "#f4f4f4",
                "text-align": "left",
            },
            td:{
                "padding": "8px",
                "boarder-bottom": "1px solid #ddd",
            }
        }

    }).render(document.getElementById("grid-container"));

    

})
.catch(error => console.error("error fetching ", error));