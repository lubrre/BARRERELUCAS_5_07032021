const ajaxRequest = (url) => {
    fetch (url)
    .then(function (response){
        response.json().then(function (products){
            displayProducts (products)
        })
    })
    // .catch(function (error){})
}