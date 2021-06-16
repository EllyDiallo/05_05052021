

const getApi = (url) =>  fetch(url)
.then(function(response) {
return response.json()
})
.then(function(response) {
    return response;
})
.catch(error => console.log("Erreur : " + error));


const productsInStorage = JSON.parse(localStorage.getItem("storageContent"));

console.log(productsInStorage.length);

/*function displayProducts(productsInStorage){
    for(let i in productsInStorage)
}*/



function createBasket (){

    const basketArea = document.getElementById("basket");
    basketArea.setAttribute("class", "bg-light container mx-auto my-5 row  rounded justify-content-around py-5");

    const div = document.createElement("div");
    div.setAttribute("class"," col-9 col-md-6 col-lg-3  mx-3 my-3 bg-warning rounded border  w-50 h-75 border-info shadow ");

    const title = document.createElement("h1");
    title.innerHTML = "Panier";

    const choosen = document.createElement("p");
    choosen.textContent = "Vous avez choisi : ";

    const btnErase = document.createElement("button");
    btnErase.innerHTML ="Vider le panier";
    btnErase.setAttribute("class","border border-secondary shadow bg-dark rounded");

    btnErase.addEventListener("click",function(){
        localStorage.removeItem("storageContent");
    });

    for(let i =0; i < productsInStorage.length; i++){
        const id = productsInStorage[i][0];
        getApi("http://localhost:3000/api/teddies/" + id)
        .then(function(response){
            const imagesBasket = document.createElement("img");
            imagesBasket.setAttribute("width","30%")
            imagesBasket.setAttribute("height","200px");
            imagesBasket.setAttribute("src", response.imageUrl);
            imagesBasket.setAttribute("class","fit fluid rounded-top");
            div.appendChild(imagesBasket);

        });
    };

    basketArea.appendChild(div);
    div.appendChild(title);
    div.appendChild(choosen);
    
    div.appendChild(btnErase);


    
};

createBasket();

