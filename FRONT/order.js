const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");

console.log(orderId)

const orderNumber = document.getElementById('order_number');
orderNumber.innerText = orderId