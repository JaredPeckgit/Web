const formEl = document.querySelector(".form");

formEl.addEventListener("submit", event => {

    event.preventDefault();
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData)
    
    //Validate that data is there
    if(data.title == "" || data.year == "" || data.platform =="" ){
        $.toaster({priority : "danger ", title: "Error", message : "Oops something broke."});

    }

    else{
        fetch("https://api-ih62.onrender.com/api/v1/games",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)
        }).then(res => res.json())
          .then(data => console.log(data))
          .then(error => console.log(error));
          $.toaster({priority : "Success", title: "Game add", message : "New Game has been added"});

          
    }
});