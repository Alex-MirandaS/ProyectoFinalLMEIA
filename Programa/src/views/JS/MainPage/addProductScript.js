//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var agProduct = document.getElementById('addProduct');
var home = document.getElementById("home");
var listOrders = document.getElementById('listOrders');
var carrito = document.getElementById('carrito');
//IMPORTS DEL SCRIPT
const nameProduct = document.getElementById('nameProduct');
const priceProduct = document.getElementById('priceProduct');
const descriptionProduct = document.getElementById('desctProduct');
const button = document.getElementById('button');

function fillCategorys() {
    fetch('http://localhost:3000/api/getCategorys')
        .then(response => response.json())
        .then(response => {
            const arrayCategorys = response;
            let template = templateCategorys.content.cloneNode(true);
            var newSelect = template.getElementById('categorys');

            for (let index = 0; index < arrayCategorys.length; index++) {
                const temp = arrayCategorys[index];
                var newOp = document.createElement("option");
                var newContent = document.createTextNode(temp.category);
                newOp.appendChild(newContent);
                newSelect.appendChild(newOp);
            }

            contenedor.appendChild(template);

            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (nameProduct.value == "" || priceProduct.value == "" || descriptionProduct.value == "") {
                    alert('Llene los campos vacios')
                } else {
                    const data = {
                        "idOwner": idUser,
                        "productName": nameProduct.value,
                        "price": priceProduct.value,
                        "category": newSelect.value,
                        "description": descriptionProduct.value,
                    }

                    fetch('http://localhost:3000/api/addProduct', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(response => {

                            console.log(response);
                            if (response.idOwner != '') {
                                alert('Se ha registrado un nuevo producto a revisión');
                                location.reload();
                            } else {
                                alert('Usuario o Contraseña Incorrecta');
                                location.reload();
                            }

                        })
                        .catch(error => console.error(error));
                }


            })
        })
        .catch(error => console.error(error));
}

//FUNCIONES INICIALES
carrito.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/carrito.html?data=" + idUser;

})

function fillInitial() {
    home.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/home.html?data=" + idUser;
    agProduct.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/addProduct.html?data=" + idUser;
    listOrders.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/listOrders.html?data=" + idUser;
}

fillCategorys();
fillInitial();