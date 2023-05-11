//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data1');
const idLOrders = urlParams.get('data2');
var pedidos = document.getElementById('pedidos');
var entregados = document.getElementById('entregados');
var solIngreso = document.getElementById('aprobarProduct');
//IMPORTS DEL SCRIPT  
var container = document.getElementById("container");
var containerTitle = document.getElementById("containerTitle");
var containerBuy = document.getElementById("containerButton");

function fillOrders() {
    fetch('http://localhost:3000/api/getOrders/' + idLOrders)
        .then(response => response.json())
        .then(response => {
            const orders = response;

            for (let index = 0; index < orders.length; index++) {
                const temp = orders[index];

                let template = templateRow.content.cloneNode(true);

                let sku = template.getElementById('sku');
                let nameProduct = template.getElementById('nameProduct');
                let descriptionProduct = template.getElementById('descriptionProduct');
                let cantidad = template.getElementById('cantidad');
                let total = template.getElementById('total');

                sku.innerHTML = temp.sku,
                    nameProduct.innerHTML = temp.nameProduct,
                    descriptionProduct.innerHTML = temp.description,
                    cantidad.innerHTML = temp.amount,
                    total.innerHTML = temp.total,

                    container.appendChild(template);
            }
        })
        .catch(error => console.error(error))
}

function fillTitle() {
    let template = templateTitle.content.cloneNode(true);
    let numOrder = template.getElementById('numOrder');
    numOrder.innerHTML = 'Detalles de la Orden: ' + idLOrders,
        containerTitle.appendChild(template);

}

function fillInitial() {
    pedidos.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/pedidos.html?data=" + idUser;
    entregados.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/entregados.html?data=" + idUser;
    solIngreso.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/solicitudIngreso.html?data=" + idUser;
}

fillTitle();
fillOrders();
fillInitial();