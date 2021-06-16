
const productsInStorage = JSON.parse(localStorage.getItem("storageContent"));

console.log(productsInStorage);

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
    })
    

    basketArea.appendChild(div);
    div.appendChild(title);
    div.appendChild(choosen);
    
    div.appendChild(btnErase);


    
};

createBasket();

