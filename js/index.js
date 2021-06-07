 /*const products = fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))
.catch(error => console.log("Erreur : " + error));*/
 
 //Récupération de l'api

const getApi = (url) =>  fetch(url)
.then(function(response) {
return response.json()
})
.then(function(response) {
    return response;

   /* return JSON.stringify(response);*/

})
.catch(error => console.log("Erreur : " + error));




//création des cards produits

function createcards(response,i){

    
        const cardsArea = document.getElementById("teddys-cards");
        cardsArea.setAttribute("class","bg-light container mx-2 my-2 row" );
    
        const div = document.createElement("div");
        div.innerHTML = response[i].name;
        div.setAttribute("class"," col-9 col-md-6 col-lg-3  mx-3 my-3 bg-warning border border-primary text-center container");
        
        const fig = document.createElement("figure");
        fig.setAttribute("class","text-center")

        const images = document.createElement("img");
        images.setAttribute("width","100%");
        images.setAttribute("src", response[i].imageUrl);
        images.setAttribute("class","fit");
    

        const descriptions = document.createElement("figcaption");
        descriptions.innerHTML = response[i].description;
        descriptions.setAttribute("class","bg-secondary");

        const options = document.createElement("ol");
        options.innerHTML = "Choisissez votre couleur" + response[i].colors;
        options.classList.add("text-left");

        const price = document.createElement("p");
        price.innerHTML = response[i].price;
        price.setAttribute("class","text-right");

        const link = document.createElement("a");
        link.innerHTML = response[i]._id;


        cardsArea.appendChild(div);
        div.appendChild(link);
        link.appendChild(fig);
        fig.appendChild(images);
        fig.appendChild(descriptions);
        fig.appendChild(options);
        fig.appendChild(price);
   
};



getApi("http://localhost:3000/api/teddies")

.then(function(response){
    for(let i =0 ; i < response.length; i = i+1){
   console.log(response);
    createcards(response,i);
    }   
}
);



