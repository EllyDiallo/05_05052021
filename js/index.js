const products =  fetch("http://localhost:3000/api/teddies" )
.then(function(response) {
  response.json()
    .then(function(response) {
      alert(response);
    })
})


/*fetch("http://localhost:3000/api/teddies")

.then(function(response) {
  alert(response.json);
})


.catch(error => alert("Erreur :" + error));*/





/*const responseApi = new XMLHttpRequest();

  responseApi.open("GET","http://localhost:3000/api/teddies");

  responseApi.responseType = "json";

  responseApi.send();

  responseApi.onload = function(){
    if(responseApi.status != 200){
      alert("Erreur " + responseApi.status + " : " + responseApi.statusText);
    
  }else{
    
    alert(responseApi.response.length + " octets  téléchargés\n" + JSON.stringify(responseApi.response));
    JSON.stringify(responseApi.response);
  }
};

responseApi.onerror = function(){
  alert("La réponse a échoué.");
};

responseApi.onprogress = function(event){
  if(event.lengthComputable){
    alert(event.loaded + " octets reçus sur un total de " + event.total);
  }
};

console.log(responseApi);*/

/*function createCard (responseApi){

  const div = document.createElement("div");
  div.innerHTML = responseApi.name;
  div.setAttribute(
    "class","col-10 col-lg-5"
  );

  const image = document.createElement("img");
  image.innerHTML = responseApi.imageUrl;
  image.setAttribute("width","100%");

};*/
