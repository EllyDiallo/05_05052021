
/************************************** variable du localStorage */
let productsInStorage = JSON.parse(localStorage.getItem("storageContent"));

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

        div.appendChild(divBasket);
        divBasket.appendChild(nameBasket);
        divBasket.appendChild(imagesBasket);
        divBasket.appendChild(optionSelected);
        divBasket.appendChild(priceBasket);
            
    };

    
    const totalPrice = document.createElement("div");
    totalPrice.setAttribute("class","align-self-center my-3");
    totalPrice.innerHTML = " Prix total : " + totalPriceTeddy(productsInStorage) + "€" +   "<br>" + productsInStorage.length + " produit\(s\)";
    

    const btnErase = document.createElement("button");
    btnErase.textContent ="Vider le panier";
    btnErase.setAttribute("class","border border-secondary my-3 shadow bg-dark rounded float-right");
    btnErase.setAttribute("type","button");

    /**************************Au click du boutton vider le panier */
    btnErase.addEventListener("click",function(){

        localStorage.removeItem("storageContent");
      
        const eraseDiv = document.getElementById("empty");
        eraseDiv.removeChild(basket);
        eraseDiv.textContent = "Votre panier est vide";
        eraseDiv.setAttribute("class","text-center bg-dark w-50 align-self-center");

    });

    div.appendChild(totalPrice);    
    div.appendChild(btnErase);

};

createBasket(productsInStorage);

//***********************création objet {contact} */

const contact = {
    firstName: "" ,
    lastName:"",
    address: "",
    city: "",
    email: ""
};

/*************************création array[products] */

const products = [];

for(let i = 0; i < productsInStorage.length; i++){
    products.push(productsInStorage[i][0]);
};

/***************************creation de la requête POST */

const urlOrder = "http://localhost:3000/api/teddies/order";

/*******************function POST API */

const postApi = (urlOrder) => fetch(urlOrder, {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
    },
    body: JSON.stringify({ contact: contact, products: products })
})
.then((response) => response.json())
.then(function(json) {
    localStorage.setItem("orderConfirmation",JSON.stringify(json.orderId));

})
.catch((error) => console.log("error:", error));

/*************************************function 3 inputs regex "simple chaine de caractères" */

function simpleStringValidity(event){

    const prenomF = document.getElementById("first-name");
    const firstMissing = document.getElementById("first-name-missing");

    const nomF = document.getElementById("last-name");
    const lastMissing = document.getElementById("last-name-missing");

    const cityF = document.getElementById("city");
    const cityMissing = document.getElementById("city-missing");

    const reg1 = /^[A-ZÉÈÏÎ][a-zéèàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ]+)?/;

    if(prenomF.validity.valueMissing){

        event.preventDefault();
        firstMissing.textContent = "Prénom manquant";
        firstMissing.style.color = "red";

    }else if(reg1.test(prenomF.value) == false){

        event.preventDefault();
        firstMissing.textContent = "Format incorrect : Seule la première lettre peut être une majuscule, les prénoms composés d'un espace ou un '-' sont accecptés";
        firstMissing.style.color = "orange";

    }else if(nomF.validity.valueMissing){

        event.preventDefault();
        lastMissing.textContent = "Nom manquant";
        lastMissing.style.color = "red";

    }else if(reg1.test(nomF.value) == false){

        event.preventDefault();
        lastMissing.textContent = "Format incorrect : Seule la première lettre peut être une majuscule, les noms composés d'un espace ou un '-' sont accecptés";
        lastMissing.style.color = "orange";

    }else if(cityF.validity.valueMissing){

        event.preventDefault();
        cityMissing.textContent = "Ville non-définie";
        cityMissing.style.color = "red";

    }else if(reg1.test(cityF.value) == false){

        event.preventDefault();
        cityMissing.textContent = "Format incorrect : Seule la première lettre peut être une majuscule, les ville composés d'un espace ou un '-' sont accecptés";
        cityMissing.style.color = "orange";

    }else{
        
        return true;
    };

    if (prenomF.validity.valueMissing == false && reg1.test(prenomF.value) == true){
        
        firstMissing.textContent = "Valide";
        firstMissing.style.color = "green";

    };

    if(nomF.validity.valueMissing == false && reg1.test(nomF.value) == true){

        lastMissing.textContent = "Valide";
        lastMissing.style.color = "green";

    };
    if(cityF.validity.valueMissing == false && reg1.test(cityF.value) == true){

        cityMissing.textContent = "Valide";
        cityMissing.style.color = "green";
    };
};

/*********************************fonction regex email */

function emailValidity(event){
    const emailF = document.getElementById("email");
    const emailMissing = document.getElementById("email-missing");

    const reg2 = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

    if(emailF.validity.valueMissing){
        event.preventDefault();
        emailMissing.textContent = "Adresse maïl non-définie";
        emailMissing.style.color = "red";

    }else if(reg2.test(emailF.value)== false){
        event.preventDefault();
        emailMissing.textContent = "Format incorrect, veuillez uitiliser le format exemple : xxxx@yyyy.com ";
        emailMissing.style.color = "orange";

    }else{
        emailMissing.textContent = "Valide";
        emailMissing.style.color = "green";
        return true;
    };
};
  
/******************************fonction regex adresse */

function adresseValidity(event){
    const adresseF = document.getElementById("adresse");
    const adresseMissing = document.getElementById("adresse-missing");
    const reg3 = /^([\d]{1,3})(?:(?:[,.\s ]){1,2}[a-zA-Zàâäéèêëïîôöùûüç]+)+/i;
    if(adresseF.validity.valueMissing){
        event.preventDefault();
        adresseMissing.textContent = "Adresse non-définie";
        adresseMissing.style.color = "red";
    }else if(reg3.test(adresseF.value)== false){

        event.preventDefault();
        adresseMissing.textContent = "Format incorrect, veuillez uitiliser  le format '21, rue Monnet";
        adresseMissing.style.color = "orange";

    }else{
        adresseMissing.textContent = "Valide";
        adresseMissing.style.color = "green";
        return true;
    };
};




/********************** fonction pour assigner des valeur à {contact} */

function createContact() {

    contact.firstName = document.getElementById("first-name").value;
    contact.lastName = document.getElementById("last-name").value;
    contact.address = document.getElementById("adresse").value;
    contact.city = document.getElementById("city").value;
    contact.email = document.getElementById("email").value;;

};

/********************** function de véification array.string */
function checkProductsContainStrings(val){

    return typeof val == "string" ? true : false;   
   
};
 
/******************************* fonction évenement  au click du boutton */

const buttonForm = document.getElementById("btn-form");
buttonForm.addEventListener('click',function(event){
       
    event.preventDefault();
    
    createContact();


    if(
        products.every(checkProductsContainStrings) == true &&
        contact instanceof Object == true && simpleStringValidity(event) == true && adresseValidity(event) == true && emailValidity(event) == true 
        ){
        postApi(urlOrder);
        localStorage.removeItem("storageContent");
        this.onclick(window.location = '/frontend/confirmation.html');
        
    }else{
        alert("Un problème est survenu");
    }
     

});

  

       
 
   

      
    


