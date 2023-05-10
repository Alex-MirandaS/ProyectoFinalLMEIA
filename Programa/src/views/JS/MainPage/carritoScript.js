//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var agProduct = document.getElementById('addProduct');
var home = document.getElementById("home");
var listOrders = document.getElementById('listOrders');
//IMPORTS DEL SCRIPT
var container = document.getElementById("container");
var containerBuy = document.getElementById("containerButton");

function fillListOrders() {
    fetch('http://localhost:3000/api/getShopBag/' + idUser)
        .then(response => response.json())
        .then(response => {
            const shopBag = response;

            if (shopBag.length != 0) {
                let template = templateButtonBuy.content.cloneNode(true);
                let wallet = template.getElementById('wallet');
                let buyButton = template.getElementById('buy');

                fetch('http://localhost:3000/api/getWallet/' + idUser).
                then(response => response.json())
                    .then(response => {
                        wallet.innerHTML = 'Cartera: Q.' + response.wallet
                    })
                    .catch(error => console.error(error));

                buyButton.addEventListener('click', (e) => {
                    e.preventDefault();

                    const data = {
                        idUser: idUser
                    }

                    fetch('http://localhost:3000/api/addOrders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            if (response) {
                                alert('SU COMPRA SE HA REALIZADO CON EXITO');
                                location.reload();
                            }
                        })
                        .catch(error => console.error(error));
                })
                containerBuy.appendChild(template);
            }

            for (let index = 0; index < shopBag.length; index++) {
                const temp = shopBag[index];

                let template = templateRow.content.cloneNode(true);

                let sku = template.getElementById('sku');
                let nameProduct = template.getElementById('nameProduct');
                let descriptionProduct = template.getElementById('descriptionProduct');
                let cantidad = template.getElementById('cantidad');
                let total = template.getElementById('total');
                let deleteProduct = template.getElementById('deleteProduct');

                sku.innerHTML = temp.sku,
                    nameProduct.innerHTML = temp.nameProduct,
                    descriptionProduct.innerHTML = temp.description,
                    cantidad.innerHTML = temp.cantidad,
                    total.innerHTML = 'Q' + temp.total,

                    container.appendChild(template);

                deleteProduct.addEventListener('click', (e) => {
                    e.preventDefault();

                    const data = {
                        idUser: idUser,
                        idProduct: temp.sku,
                        amount: temp.cantidad
                    }

                    fetch('http://localhost:3000/api/deleteShopBag', {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            if (response.status = 'deleted') {
                                location.reload();
                            }
                        })
                        .catch(error => console.error(error));
                })
            }
        }).catch(error => console.error(error))
}

function fillInitial() {
    home.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/home.html?data=" + idUser;
    agProduct.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/addProduct.html?data=" + idUser;
    listOrders.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/listOrders.html?data=" + idUser;
}

fillListOrders();
fillInitial();