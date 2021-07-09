

const confirmationInStorage = JSON.parse(localStorage.getItem("orderConfirmation"));

console.log(JSON.stringify(confirmationInStorage));

const sectionOrder = document.getElementById("teddys-confirmation");
sectionOrder.setAttribute("class", "mx-5 bd-highlight mb-3  my-5 bg-warning shadow d-flex flex-column text-center  flex-wrap w-auto h-auto justify-content-center");

const titleOrder = document.createElement("h1");
titleOrder.innerHTML = "Votre commande a bien été enregistrée";
titleOrder.setAttribute("class","my-3");
titleOrder.style.color = "green";

const numberOder = document.createElement("p");
numberOder.innerHTML = "Votre numéro de commande est le : <br>" + confirmationInStorage;
numberOder.setAttribute("class","my-3");

const btnBackHome = document.createElement("a");
btnBackHome.textContent = "retour à l'acceuil";
btnBackHome.setAttribute("class","border border-secondary my-5 w-25 align-self-center shadow bg-primary rounded");
btnBackHome.setAttribute("href","index.html");


sectionOrder.appendChild(titleOrder);
sectionOrder.appendChild(numberOder);
sectionOrder.appendChild(btnBackHome);