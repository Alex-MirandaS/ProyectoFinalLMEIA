//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data1');
const idProduct = urlParams.get('data2');
var home = document.getElementById("home");
var agProduct = document.getElementById('addProduct');
var listOrders = document.getElementById('listOrders');
var carrito = document.getElementById('carrito');
//CONTENEDORES
var containerProduct = document.getElementById("container");

function fillProduct() {

    fetch('http://localhost:3000/api/getProduct/' + idProduct)
        .then(response => response.json())
        .then(response => {
            const product = response;
            console.log('--------------');
            console.log(product);
            let template = templateProductPage.content.cloneNode(true);
            let skuProduct = template.getElementById('SKU');
            let nameProduct = template.querySelector('h1');
            let price = template.querySelector('span');
            let description = template.querySelector('p');
            let addToCar = template.querySelector('button');
            let amount = template.querySelector('input');

            skuProduct.innerHTML = product.idProduct;
            nameProduct.innerHTML = product.productName;
            price.innerHTML = 'Q' + product.price;
            description.innerHTML = product.description;

            addToCar.addEventListener('click', (e) => {
                e.preventDefault();
                const data = {
                    idUser: idUser,
                    idProduct: idProduct,
                    amount: amount.value
                }
                fetch('http://localhost:3000/api/addShopBag', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(response => {

                        console.log(response);
                        if (response.idUser != '') {
                            alert('Se ha agregado un nuevo producto a su carrito');
                        } else {

                            location.reload();
                        }

                    })
                    .catch(error => console.error(error));
            });



            containerProduct.appendChild(template);
        })
        .catch(error => console.error(error));
}

//FUNCIONES INICIALES
carrito.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/carrito.html?data=" + idUser;

})

function fillInitial() {
    agProduct.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/addProduct.html?data=" + idUser;
    listOrders.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/listOrders.html?data=" + idUser;
    home.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/home.html?data=" + idUser;
}

fillProduct();
fillInitial();