
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
            btnEraseItem.setAttribute("class","border border-secondary my-2 shadow bg-dark rounded float-right");
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
    btnErase.setAttribute("class","border border-secondary my-3 shadow bg-dark rounded float-right");
    btnErase.setAttribute("type","button");

    
    btnErase.addEventListener("click",function(){
        localStorage.removeItem("storageContent");
      
        const eraseDiv = document.getElementById("empty");
        eraseDiv.removeChild(basket);
        eraseDiv.textContent = "Votre panier est vide";
        eraseDiv.setAttribute("class","text-center bg-dark w-50 align-self-center");

    });

    div.appendChild(totalPrice);    
    div.appendChild(choosen);
    div.appendChild(btnErase);

};

createBasket(productsInStorage);

//***********************création array [contact] */

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

let order = { contact: contact, products: products };
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


function firstValidity(event){
    const prenomF = document.getElementById("first-name");
    const firstMissing = document.getElementById("first-name-missing");
    const reg1 = /^[a-zA-ZéèîïÉÈÏÎ][a-zéèàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèàçîï]+)?/;
    if(prenomF.validity.valueMissing){
        event.preventDefault();
        firstMissing.textContent = "Prénom manquant";
        firstMissing.style.color = "red";
    }else if(reg1.test(prenomF.value)== false){

        event.preventDefault();
        firstMissing.textContent = "Format incorrect";
        firstMissing.style.color = "orange";

    }else{
        return true;
    };
};

function lastValidity(event){
    const nomF = document.getElementById("last-name");
    const lastMissing = document.getElementById("last-name-missing");
    const reg1 = /^[a-zA-ZéèîïÉÈÏÎ][a-zéèàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèàçîï]+)?/;
    if(nomF.validity.valueMissing){
        event.preventDefault();
        lastMissing.textContent = "Nom manquant";
        lastMissing.style.color = "red";
    }else if(reg1.test(nomF.value)== false){

        event.preventDefault();
        lastMissing.textContent = "Format incorrect";
        lastMissing.style.color = "orange";

    }else{
        return true;
    };
};


function cityValidity(event){
    const cityF = document.getElementById("city");
    const cityMissing = document.getElementById("city-missing");
    const reg1 = /^[a-zA-ZéèîïÉÈÏÎ][a-zéèàçîï]+([-'\s][a-zA-ZéèîïÉÈÏÎ][a-zéèàçîï]+)?/;
    if(cityF.validity.valueMissing){
        event.preventDefault();
        cityMissing.textContent = "Ville non-définie";
        cityMissing.style.color = "red";
    }else if(reg1.test(cityF.value)== false){

        event.preventDefault();
        cityMissing.textContent = "Format incorrect";
        cityMissing.style.color = "orange";

    }else{
        return true;
    };
};


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
        emailMissing.textContent = "Format incorrect, veuillez uitiliser un '@' et le format '.com ou .fr ect' ";
        emailMissing.style.color = "orange";

    }else{
        return true;
    };
};

function adresseValidity(event){
    const adresseF = document.getElementById("adresse");
    const adresseMissing = document.getElementById("adresse-missing");
    const reg3 = /^([\d]{1,3})(?:(?:[,. ]){1,2}[a-zA-Zàâäéèêëïîôöùûüç]+)+/i;
    if(adresseF.validity.valueMissing){
        event.preventDefault();
        adresseMissing.textContent = "Adresse non-définie";
        adresseMissing.style.color = "red";
    }else if(reg3.test(adresseF.value)== false){

        event.preventDefault();
        adresseMissing.textContent = "Format incorrect, veuillez uitiliser  le format '21, rue Monnet";
        adresseMissing.style.color = "orange";

    }else{
        return true;
    };
};






function createContact() {

    const prenom = document.getElementById("first-name").value;
    const nom = document.getElementById("last-name").value;
    const addre = document.getElementById("adresse").value;
    const ville = document.getElementById("city").value;
    const mail = document.getElementById("email").value;
    
    contact.firstName = prenom;
    contact.lastName = nom;
    contact.address = addre;
    contact.city = ville;
    contact.email = mail;

};
 

const buttonForm = document.getElementById("btn-form");
buttonForm.addEventListener('click',function(event){
       
    event.preventDefault();
    
    createContact();

    firstValidity(event);
    lastValidity(event);
    cityValidity(event);
    adresseValidity(event);
    emailValidity(event);

    postApi(urlOrder);

    if(
        firstValidity(event) == true &&
        lastValidity(event) == true &&
        cityValidity(event) == true &&
        adresseValidity(event) == true &&
        emailValidity(event) == true 
    ){
        this.onclick(window.location = '/confirmation.html');
    }else{
        alert("Veuillez remplir toutes les informations du formulaire afin de valider la commande");
    }

   
    //console.log(postApi(urlOrder));
    //console.log(firstValidity(event));
});

  

       
 
   

      
    


