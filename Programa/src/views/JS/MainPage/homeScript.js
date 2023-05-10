//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var agProduct = document.getElementById('addProduct');
var listOrders = document.getElementById('listOrders');
var carrito = document.getElementById('carrito');
//IMPORTS DEL SCRIPT
var liComponent = document.getElementById("categorys");
var containerProducts = document.getElementById("containerProducts");


function fillProducts() {

    fetch('http://localhost:3000/api/getCatalogueProducts')
        .then(response => response.json())
        .then(response => {
            const arrayProducts = response;
            for (let index = 0; index < arrayProducts.length; index++) {

                let template = templateProducts.content.cloneNode(true);
                let nameProduct = template.querySelector('h5');
                let price = template.querySelector('span');
                let enlace = template.querySelector('a');
                const temp = arrayProducts[index];

                nameProduct.innerHTML = temp.productName;
                price.innerHTML = 'Q' + temp.price;
                enlace.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/productPage.html?data1=" + idUser + "&data2=" + temp.idProduct;
                containerProducts.appendChild(template);
            }
        })
        .catch(error => console.error(error));

}

function fillCategorys() {
    fetch('http://localhost:3000/api/getCategorys')
        .then(response => response.json())
        .then(response => {

            const arrayCategorys = response;
            // Crear un nuevo elemento select
            var newSelect = document.createElement("select");
            //Agregamos sus atributos y estilos
            newSelect.className = "nav-link dropdown-toggle";
            newSelect.id = "navbarDropdown";
            newSelect.role = "button";
            //data - bs - toggle = "dropdown"
            newSelect.ariaExpanded = "false";
            for (let index = 0; index < arrayCategorys.length; index++) {
                const temp = arrayCategorys[index];
                var newOp = document.createElement("option");
                var newContent = document.createTextNode(temp.category);
                newOp.appendChild(newContent);
                newSelect.appendChild(newOp);
            }

            // Agregar el nuevo elemento al componente
            liComponent.appendChild(newSelect);
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
}

fillCategorys();
fillProducts();
fillInitial();