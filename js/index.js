 //Récupération de l'api
 
 /*const getApi = () =>  fetch("http://localhost:3000/api/teddies" )
.then(function(response) {
return response.json()
})
.then(function(response) {
console.log(JSON.stringify(response));
})
.catch(error => console.log("Erreur : " + error));

getApi();*/

const getApi = (url) =>  fetch(url)
.then(function(response) {
return response.json()
})
.then(function(response) {
console.log(JSON.stringify(response));
})
.catch(error => console.log("Erreur : " + error));




getApi("http://localhost:3000/api/teddies"); 


function createcards(response,cardsArea){

    const cardsArea = document.getElementById("teddys-cards");

    const div = document.createElement("div");
    div.innerHTML = response.name;
    div.setAttribute("class","col-10 col-lg-5");
    
    const fig = document.createElement("figure");

    const images = document.createElement("img");
    images.setAttribute(
        ["width","100%"],
        ["src",response.imageUrl]
    );

    const descriptions = document.createElement("figcaption");
    descriptions.innerHTML = response.descriptions;

    const options = document.createElement("ol");
    options.innerHTML = "Choisissez votre couleur" + response.colors;
    options.setAttribute("class","text-left");

    const price = document.createElement("p");
    price.innerHTML = response.price;

    const link = document.createElement("a");
    link.innerHTML = reponse._id;


    cardsArea.appendChild(div);
    div.appendChild(link);
    link.appendChild(fig);
    fig.appendChild(images);
    fig.appendChild(descriptions);
    link.appendChild(options);
    link.appendChild(price);
};

/*const products = fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))
.catch(error => console.log("Erreur : " + error));*/


