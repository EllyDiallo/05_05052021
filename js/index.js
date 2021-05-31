/*const responseApi = fetch("http://localhost:3000/api/teddies",{method:GET})
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    console.log("une erreur"+ err +"est survenue");
  });*/




 /* function addProduct(responseApi){
      for
  }*/


 let responseApi = new XMLHttpRequest();

  responseApi.open("GET","http://localhost:3000/api/teddies");

  responseApi.responseType = "json";

  responseApi.send();
