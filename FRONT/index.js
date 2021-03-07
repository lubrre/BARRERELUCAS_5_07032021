const ajaxRequest = (url) => {
    fetch (url)
    .then(function (response){
        response.json().then(function (products){
            displayProducts (products)
        })
    })
    // .catch(function (error){})
}

ajaxRequest ("http://localhost:3000/api/cameras")

const displayProducts = (products) => {

    const $productList = document.querySelector(".product");

    products.forEach( (product) =>{
    const $productCard = document.createElement ("div");
    $productList.appendChild($productCard);
    $productCard.className = "product_card";
    const $productImg = document.createElement ("div");
    $productImg.className = "img";
    $productImg.style.backgroundImage =`url(${product.imageUrl})`;
    $productCard.appendChild($productImg);
    const $productElement = document.createElement("div");
    $productElement.className = "product_element";
    $productCard.appendChild($productElement);
    const $productLink = document.createElement ("a");
    $productLink.href = `product.html?productId=${product._id}`;
    $productElement.appendChild($productLink);
    const $productTitle = document.createElement ("h2");
    $productTitle.className = "product_name";
    $productTitle.innerText = product.name;
    $productLink.appendChild($productTitle);
    const $productPrice = document.createElement ("p");
    $productElement.appendChild($productPrice);
    $productPrice.className = "product_price";
    $productPrice.innerText = product.price;
})
}



{/* <div class="product_card">
            <div class="img" style="background-image: ;"></div>
            <div class="product_element">
                <a href="product.html">
                    <h2 class="product_name">Produit 1</h2>
                </a>
                <p class="product_price">75€</p>
                <i class="fas fa-cart-plus icon_cart_add"></i>
            </div>
        </div> */}


