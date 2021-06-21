
/********************************** obtention API */
const getApi = (url) =>  fetch(url)
.then(function(response) {
return response.json()
})
.then(function(response) {
    return response;
})
.catch(error => console.log("Erreur : " + error));


let productsInStorage = JSON.parse(localStorage.getItem("storageContent"));
let productPriceInStorage = JSON.parse(localStorage.getItem("storagePriceContent"));

console.log(productsInStorage.length);


/*************************fonction somme total des prix */



function totalPriceTeddy(productsInStorage){
    let sum = 0;
    for(let p = 0 ; p < productsInStorage.length; p++){
       sum = sum + productsInStorage[p][2];
    };
    return sum;
};

/**********************************************Fonction  créer le panier */

function createBasket (productsInStorage){

    const div = document.getElementById("basket");
    const title = document.createElement("h1");
    title.innerHTML = "Panier";

    const choosen = document.createElement("p");
    choosen.textContent = "Vous avez choisi : ";

    for(let i =0; i < productsInStorage.length; i++){
        const id = productsInStorage[i][0];
        const urlTeddy = productsInStorage[i][3];
       
            const divBasket = document.createElement("div");
            divBasket.setAttribute("class", "mx-2 bd-highlight mb-3  bg-warning shadow d-flex flex-row  flex-wrap w-auto h-auto justify-content-center");

            const imagesBasket = document.createElement("img");
            imagesBasket.setAttribute("width","30%");
            imagesBasket.setAttribute("height","100px");
            imagesBasket.setAttribute("src", urlTeddy );
            imagesBasket.setAttribute("class","fit fluid rounded-top mx-2 my-2 align-self-center w-25 col-6");

            const nameBasket = document.createElement("h4");
            nameBasket.setAttribute("class","w-10 align-self-center px-2 col-6");
            nameBasket.innerHTML =  productsInStorage[i][4] ;

            const optionSelected = document.createElement("div");
            optionSelected.setAttribute("class", "w-50 mx-2 danger justify-self-center d-flex flex-wrap");
            optionSelected.innerHTML = " Option : " + productsInStorage[i][1];

            const priceBasket = document.createElement("div");
            priceBasket.setAttribute("class","w-25 align-self-end justify-self-end ml-auto p-2 bd-highlight");
            priceBasket.innerHTML = " Prix HT : " + productsInStorage[i][2] + "€" ;

            const btnEraseItem = document.createElement("button");
            btnEraseItem.textContent ="Annuler le produit";
            btnEraseItem.setAttribute("class","border border-secondary shadow bg-dark rounded float-right");
            btnEraseItem.setAttribute("type","button");
            btnEraseItem.addEventListener("click",function(){
                localStorage.removeItem("storageContent"[i]);
                
            });

            div.appendChild(divBasket);
            divBasket.appendChild(nameBasket);
            divBasket.appendChild(imagesBasket);
            divBasket.appendChild(optionSelected);
            divBasket.appendChild(priceBasket);
            divBasket.appendChild(btnEraseItem);
            
    };

    
    const totalPrice = document.createElement("div");
    totalPrice.setAttribute("class","align-self-center my-3");
    totalPrice.innerHTML = " Prix total : " + totalPriceTeddy(productsInStorage) + "€" +   "<br>" + productsInStorage.length + " produit\(s\)";
    
    const btnErase = document.createElement("button");
    btnErase.textContent ="Vider le panier";
    btnErase.setAttribute("class","border border-secondary shadow bg-dark rounded float-right");
    btnErase.setAttribute("type","button");

    btnErase.addEventListener("click",function(){
        localStorage.removeItem("storageContent");
     
    });

    div.appendChild(totalPrice);    
    div.appendChild(choosen);
    div.appendChild(btnErase);

};

createBasket(productsInStorage);

// Créer un élémént prix avec retour de storaPriceContent