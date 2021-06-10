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
        cardsArea.setAttribute("class","bg-light container mx-auto my-5 row  justify-content-around py-5" );
    
        const div = document.createElement("div");
        div.innerHTML = response[i].name;
        div.setAttribute("class"," col-9 col-md-6 col-lg-3  mx-3 my-3 bg-warning w-25 rounded border border-primary shadow ");
        
        const fig = document.createElement("figure");
        fig.setAttribute("class","")

        const images = document.createElement("img");
        images.setAttribute("width","100%");
        images.setAttribute("height","200 px");
        images.setAttribute("src", response[i].imageUrl);
        images.setAttribute("class","fit fluid rounded");
    

        const descriptions = document.createElement("figcaption");
        descriptions.innerHTML = response[i].description;
        descriptions.setAttribute("class","bg-secondary text-center");

        const options = document.createElement("p");
        options.innerHTML = "Option de  couleur : " + response[i].colors;
        options.classList.add("text-left,wrap");
        

        const price = document.createElement("p");
        price.innerHTML = "Prix : " +  response[i].price + "€";
        price.setAttribute("class","text-right");

        const link = document.createElement("a");
        link.setAttribute("href", "product.html?id=" + response[i]._id);


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
    for(let i =0 ; i < response.length; i++){
   console.log(response);
    createcards(response,i);
    }   
}
);



