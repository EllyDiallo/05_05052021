//reponse de l'Api

const getApi = (url) =>  fetch(url)
.then(function(response) {
return response.json()
})
.then(function(response) {
    return response;
})
.catch(error => console.log("Erreur : " + error));


//obtention de l'ID.

function getIdProduct(){
    const searchedId = window.location.search;
    const idProduct = searchedId.replace("?id=","");
    return idProduct;
};


//fonction option


/*function buildList(response,c){
 
    for (let c = 0 ; c < response.colors.length; c++){
        var item =  document.createElement("option");
        item.innerHTML = " couleur : " + response.colors[c];
        item.setAttribute("value", response.colors[c]);
    }
        
    
};*/



// crréation de la carte produit

function createProduct (response){

    const productArea = document.getElementById("teddys-product");
    productArea.setAttribute("class", "bg-light container mx-auto my-5 row  rounded justify-content-around py-5")

    const div = document.createElement("div");
    div.innerHTML = response.name;
    div.setAttribute("class"," col-9 col-md-6 col-lg-3  mx-3 my-3 bg-warning rounded border  w-50 h-75 border-info shadow ");

    const fig = document.createElement("figure");
    fig.setAttribute("class","")

    const images = document.createElement("img");
    images.setAttribute("width","100%");
    images.setAttribute("height","400px");
    images.setAttribute("src", response.imageUrl);
    images.setAttribute("class","fit fluid rounded-top");
    

    const descriptions = document.createElement("figcaption");
    descriptions.innerHTML = response.description;
    descriptions.setAttribute("class","bg-secondary text-center");

    const label = document.createElement("label");
    label.innerHTML = "Choisissez une option :";
    label.setAttribute("for","option-selection");
  

    const selection = document.createElement("select");
    selection.setAttribute("id","option-selection");
    selection.setAttribute("name","coleurs");
    
    const itemDefault = document.createElement("option");
    itemDefault.innerHTML = "Choisir une couleur";
    selection.appendChild(itemDefault);

    for (let c = 0 ; c < response.colors.length; c++){

        const item =  document.createElement("option");
        item.setAttribute("value", response.colors[c]);
        item.innerHTML = response.colors[c];
        selection.appendChild(item);
    };
    
        

    const price = document.createElement("p");
    price.innerHTML = "Prix : " +  response.price + "€";
    price.setAttribute("class","text-right");

    const link = document.createElement("a");
    link.setAttribute("href", "product.html?id=" + response._id);


    productArea.appendChild(div);
    div.appendChild(fig);
    fig.appendChild(images);
    fig.appendChild(descriptions);
    fig.appendChild(label);
    fig.appendChild(selection);
    
    fig.appendChild(price);

};



getApi("http://localhost:3000/api/teddies/" + getIdProduct())

.then(function(response){
    
   createProduct(response);
//function afficher produit
});
