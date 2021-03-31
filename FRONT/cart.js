const ajaxPostRequest = (url, order) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    const reqInit = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: headers
    };
 
    fetch (url, reqInit)
    .then(function (response){
        response.json().then(function (result){
            console.log(result)
            location.href = `order.html?orderId=${result.orderId}`
        })
    })
    // .catch(function (error){})
}

const checkStorage = ()=>{
    let storage = localStorage.getItem ('orinoco_p5_lucas');

    if (!storage){
        storage = [];
    }else{
        storage = JSON.parse(storage);
    }

    return storage;
}

let basket = checkStorage();

console.log (basket)


const displayProductInBasket = (product, index) => {
    const $basketPage = document.querySelector ('.cart_page');
    const $basketCardPage = document.createElement ('div');
    $basketPage.appendChild($basketCardPage);
    $basketCardPage.className = 'cart_card_page';
    const $basketCardInfo = document.createElement ('div');
    $basketPage.appendChild($basketCardInfo);
    $basketCardInfo.className = 'cart_element_page_left';
    const $basketElementPage = document.createElement ('div');
    $basketPage.appendChild($basketElementPage);
    $basketElementPage.className = 'cart_product_info';

    // img product
    const $basketProductImg = document.createElement('img');
    $basketProductImg.className = 'img_1_cart';
    $basketProductImg.src = product.img;
    $basketElementPage.appendChild($basketProductImg);
    
    // title
    const $basketTitleProduct = document.createElement ('p');
    $basketElementPage.appendChild($basketTitleProduct);
    $basketTitleProduct.className = 'cart_product_page';
    $basketTitleProduct.innerText = product.name;
    
    // quantity selector
    const $basketQuantityProduct = document.createElement ('select');
    for (let i = 1; i < 11; i++) {
        const $optionQuantity = document.createElement ('option');
        $optionQuantity.value = i;
        $optionQuantity.innerText = i;
        $basketQuantityProduct.appendChild($optionQuantity)
    }
    $basketElementPage.appendChild($basketQuantityProduct);
    $basketQuantityProduct.className = 'cart_quantity_page';
    $basketQuantityProduct.value = product.quantity;
    $basketQuantityProduct.addEventListener('change',()=>{
        basket[index].quantity = $basketQuantityProduct.value;
        localStorage.setItem('orinoco_p5_lucas', JSON.stringify(basket))
        // console.log($basketQuantityProduct.value)
    })

    // lens + price info
    const $basketLensProduct = document.createElement ('p');
    $basketElementPage.appendChild($basketLensProduct);
    $basketLensProduct.className = 'cart_lens_page';
    $basketLensProduct.innerText = product.lens;
    const $basketPriceProduct = document.createElement ('p');
    $basketElementPage.appendChild($basketPriceProduct);
    $basketPriceProduct.className = 'cart_product_page';
    $basketPriceProduct.innerText = product.price;

    // remove button
    const $basketRemoveItem = document.createElement('button');
    $basketElementPage.appendChild($basketRemoveItem);
    $basketRemoveItem.className = 'cart_remove_item';
    $basketRemoveItem.innerText = 'Supprimer du panier';
    $basketRemoveItem.addEventListener('click', ()=>{
        basket.splice(index, 1);
        basket = basket.map((product, index)=>{
            product.index = index;
            return product;
        })
        localStorage.setItem('orinoco_p5_lucas', JSON.stringify(basket));
        const $cartProductInfoList = document.querySelectorAll ('.cart_product_info');
        const $productToRemove = $cartProductInfoList[index];
        $basketPage.removeChild($productToRemove);
    }) 
}

basket.forEach((product, index) => {
    displayProductInBasket(product, index);
});

// variable quantity + price 
// const total = product.price + $basketQuantityProduct


// order form 

const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const address = document.getElementById('address');
const city = document.getElementById('city');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    // get the values from the inputs
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();

    const errors = getNumberOfErrorInForm(firstNameValue, lastNameValue, emailValue, addressValue, cityValue);

    if (errors > 0){
        return;
    }

    const products = basket.map((product)=>{
        return product._id
    })

    const order = {
        contact:{
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            address: addressValue,
            city: cityValue
        },
        products: products
        
    }

    ajaxPostRequest(`http://localhost:3000/api/cameras/order`, order)
});

function getNumberOfErrorInForm(firstNameValue, lastNameValue, emailValue, addressValue, cityValue){

    let errors = 0;

    //firstName
    if(firstNameValue === ''){
        setErrorFor(firstName, 'First Name cannot be blank');
        errors++
    }else{
        setSuccessFor(firstName)
    }

    //lastName
    if(lastNameValue === ''){
        setErrorFor(lastName, 'Last Name cannot be blank');
        errors++
    }else{
        setSuccessFor(lastName)
    }

    //Email
    if(emailValue === ''){
        setErrorFor(email, 'Email cannot be blank');
        errors++
    }else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email is not valid');
        errors++
    }else{
        setSuccessFor(email)
    }

    //Address
    if(addressValue === ''){
        setErrorFor(address, 'Address cannot be blank');
        errors++
    }else{
        setSuccessFor(address)
    }

    //City
    if(cityValue === ''){
        setErrorFor(city, 'City cannot be blank');
        errors++
    }else{
        setSuccessFor(city)
    }

    return errors
}

function setErrorFor(input, message){
    const formControl = input.parentElement; //.form-control
    const small = formControl.querySelector('small');

    //add error message inside small
    small.innerText = message;

    //add error class
    formControl.className = 'form-control error';
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
} 


    // // total price
    // const displayTotalPrice = ()=>{
    // const $basketTotal = document.querySelector('.total');
    // const $basketTotalPrice = document.createElement('div');
    // $basketTotalPrice.className = 'total_price';
    // $basketTotal.appendChild($basketTotalPrice);
    // const $basketPriceTitle = document.createElement('p');
    // $basketTotalPrice.appendChild($basketPriceTitle);
    // $basketPriceTitle.className = 'total_price_title';
    // const $basketPriceNumber = document.createElement('p');
    // $basketTotalPrice.appendChild($basketPriceNumber);
    // $basketPriceNumber.className = 'total_price_number';
    // $basketPriceNumber.innerText = 'salut';
    // }
    
