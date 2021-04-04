// récuperer le numero de commande depuis la page cart.js

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");


// afficher dans la console le numero de commande
// console.log(orderId) 


//afficher le numero de commande sur la page 

const orderNumber = document.getElementById('order_number');
orderNumber.innerText = orderId