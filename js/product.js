//***********************************reponse de l'Api

const getApi = (url) =>  fetch(url)
.then(function(response) {
return response.json()
})
.then(function(response) {
    return response;
})
.catch(error => console.log("Erreur : " + error));
/************************************************* */

let productsInStorage = JSON.parse(localStorage.getItem("storageContent"));

//*********************************obtention de l'ID.

function getIdProduct(){
    const searchedId = window.location.search;
    const idProduct = searchedId.replace("?id=","");
    return idProduct;
};
 
/************************************************ */




//***************************Création classe Product

 function sendProduct(id , optColorSelected, teddyPrice, teddyPic, teddyName ){
     this.id = id;
     this.optColorSelected = optColorSelected;
     this.teddyPrice = teddyPrice;
     this.teddypic = teddyPic;
     this.teddyName = teddyName;
     let file = [id , optColorSelected, teddyPrice, teddyPic, teddyName];
     return file;
 };

/************************************************ */




//*****************fonction envoyer au localstorage

function addToStorage(id, optColorSelected, teddyPrice, teddyPic, teddyName){
    storageContent = JSON.parse(localStorage.getItem("storageContent"));
    if (storageContent === null){
        storageContent = [];
    }

    let product = new sendProduct(id, optColorSelected, teddyPrice, teddyPic, teddyName);
    storageContent.push(product);
    localStorage.setItem("storageContent",JSON.stringify(storageContent));


};
/********************************** */


/********************************************** */


// création de la carte produit

function createProduct (response){

    const productArea = document.getElementById("teddys-product");
    productArea.setAttribute("class", "bg-light container mx-auto my-5 row  rounded justify-content-around py-5")

    const div = document.createElement("div");
    div.innerHTML = response.name;
    div.setAttribute("class"," col-9 col-md-6 col-lg-3  mx-3 my-3 bg-warning rounded border  w-50 h-75 border-info shadow ");

    const fig = document.createElement("figure");
    
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
    selection.setAttribute("class","border border-secondary shadow bg-primary rounded ");
    
    const itemDefault = document.createElement("option");
    itemDefault.innerHTML = "Choisir une couleur";
    selection.appendChild(itemDefault);
//**********************************création des options
    for (let c = 0 ; c < response.colors.length; c++){

        const item =  document.createElement("option");
        item.setAttribute("value", response.colors[c]);
        item.innerHTML = response.colors[c];
        selection.appendChild(item);
    };
 //*************************************************** */   
        

    const price = document.createElement("p");
    price.innerHTML = "Prix : " +  response.price + "€";
    price.setAttribute("class","text-right");

    const link = document.createElement("a");
    link.setAttribute("href", "product.html?id=" + response._id);

    const btn = document.createElement("button");
    btn.innerHTML ="Ajoutez au panier";
    btn.setAttribute("class","border border-secondary shadow bg-danger rounded");

    const teddyName = response.name;
    const teddyPrice = response.price;
    const teddyPic = response.imageUrl;
    

    btn.addEventListener("click",function(response){
        
        const productsInStorage = JSON.parse(localStorage.getItem("storageContent"));
        const id = getIdProduct();
        const optColor = document.getElementsByTagName("select");
        const optColorSelected = optColor[0].value; 
        addToStorage(id,optColorSelected, teddyPrice, teddyPic,teddyName);
        alert( "Un petit "+ teddyName + " de couleur "+ optColorSelected + " à été ajouté au panier");
        
        
    });

    const links = document.createElement("div");
    links.setAttribute("class", "container d-flex justify-content-between");


    const previous = document.createElement("a");
    const next = document.createElement("a");

    previous.setAttribute("class","col-2"); 
    previous.setAttribute("href","index.html");
    previous.textContent = "accueil";

    next.setAttribute("class","col-1 text-right"); 
    next.setAttribute("href","basket.html");
    next.textContent = "panier";

    productArea.appendChild(div);
    div.appendChild(fig);
    fig.appendChild(images);
    fig.appendChild(descriptions);
    fig.appendChild(label);
    fig.appendChild(selection);
    fig.appendChild(price);
    fig.appendChild(btn);
    productArea.appendChild(links);
    links.appendChild(previous);
    links.appendChild(next);

};



getApi("http://localhost:3000/api/teddies/" + getIdProduct())

.then(function(response){
    
   createProduct(response);
   
});
