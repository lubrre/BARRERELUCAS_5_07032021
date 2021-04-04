const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("productId");

console.log(productId)



const ajaxRequest = (url) => {
    fetch (url)
    .then(function (response){
        response.json().then(function (product){
            displayProduct (product)
        })
    })
    // .catch(function (error){})
}

ajaxRequest (`http://localhost:3000/api/cameras/${productId}`)


const displayProduct = (product) =>{



    const $productPage = document.querySelector ('.product_page');
    // $productPage.innerHTML = `<div class="product_card_page">
    // <img  src=" ${product.imageUrl}" class="img_1_product">
    // <div class="product_element_page">
    //     <h2 class="product_name_page"> ${product.name}</h2>
    //     <p class="product_description"> ${product.description}</p>
    //     <p class="product_price_page"> ${product.price}€</p>
    // </div>
    // </div>
    
    // <select name="lenses" id="lenses_select">
    //     <option value="">Please choose a lens</option>
    //     <option value="0">O</option>
    //     <option value="1">1</option>
    // `
    const $productCardPage = document.createElement ('div');
    $productPage.appendChild($productCardPage);
    $productCardPage.className = 'product_card_page';
    const $productImgPage = document.querySelector ('.img_1_product');
    $productImgPage.className = "img_1_product";
    $productImgPage.src = product.imageUrl;
    $productCardPage.appendChild($productImgPage);
    const $productElementPage = document.querySelector ('.product_element_page');
    $productElementPage.className = "product_element_page";
    $productCardPage.appendChild ($productElementPage);
    const $productTitlePage = document.createElement ('h2');
    $productTitlePage.className = "product_name_page";
    $productTitlePage.innerText = product.name;
    $productElementPage.appendChild($productTitlePage);
    const $productDescription = document.createElement ('p');
    $productDescription.className = "product_description";
    $productDescription.innerText = product.description;
    $productElementPage.appendChild($productDescription);
    const $productPrice = document.createElement ('p');
    $productPrice.className = 'product_price_page';
    $productPrice.innerText = product.price;
    $productElementPage.appendChild($productPrice);

    const $productSelectLens = document.createElement ("select");
    $productSelectLens.select = "lenses_select";
    $productPage.appendChild ($productSelectLens)

    product.lenses.forEach(lens => {
    const $option= document.createElement ('option');
    $option.innerText = lens;
    $option.value = lens;
    $productSelectLens.appendChild ($option);
    });

    const $productQuantity = document.createElement ("select");
    $productQuantity.className = "quantity_button";
    $productPage.appendChild ($productQuantity);
    
    for (let i = 1; i < 11; i++) {
        const $optionQuantity = document.createElement ('option');
        $optionQuantity.value = i;
        $optionQuantity.innerText = i;
        $productQuantity.appendChild($optionQuantity)
    }

    const $productBtn = document.createElement ('button');
    $productBtn.className = "product_button";
    $productPage.appendChild ($productBtn);
    $productBtn.innerHTML = 'Add to Cart';
    $productBtn.addEventListener ('click', ()=>{
        addToBasket(product, $productQuantity.value, $productSelectLens.value);
        window.location.href = 'cart.html'
    });

    

    // console.log(product)

}

const addToBasket = (camera, quantity, lens)=>{
    const cameraToSave = {
        _id : camera._id,
        name : camera.name,
        price : camera.price,
        quantity : quantity,
        lens : lens,
        img : camera.imageUrl,
    };

    let storage = localStorage.getItem ('orinoco_p5_lucas');

    if(!storage){
        storage = [];
    }else{
        storage = JSON.parse(storage);
    }
    storage.push(cameraToSave);
    
    localStorage.setItem('orinoco_p5_lucas', JSON.stringify(storage));
}