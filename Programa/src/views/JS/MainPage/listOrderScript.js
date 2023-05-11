//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var agProduct = document.getElementById('addProduct');
var home = document.getElementById("home");
//IMPORTS DEL SCRIPT
var container = document.getElementById("container");

function fillListOrders() {
    fetch('http://localhost:3000/api/getListOrders/' + idUser)
        .then(response => response.json())
        .then(response => {

            const listOrders = response;
            for (let index = 0; index < listOrders.length; index++) {
                const temp = listOrders[index];

                let template = templateRow.content.cloneNode(true);

                let codPedido = template.getElementById('codPedido');
                let fechaEnvio = template.getElementById('fechaEnvio');
                let fechaEntrega = template.getElementById('fechaEntrega');
                let total = template.getElementById('total');
                let status = template.getElementById('status');
                let detailsProduct = template.getElementById('detailsProduct');

                codPedido.innerHTML = temp.numOrder,
                    fechaEnvio.innerHTML = temp.fechaEntrega,
                    fechaEntrega.innerHTML = temp.fechaLlegada,
                    total.innerHTML = 'Q' + temp.total,
                    status.innerHTML = temp.estado,

                    detailsProduct.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.location.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/detailsList.html?data1=" + idUser + "&data2=" + temp.numOrder;
                    })

                container.appendChild(template);
            }
        })
        .catch(error => console.error(error));
}

carrito.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/carrito.html?data=" + idUser;

})

function fillInitial() {
    home.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/home.html?data=" + idUser;
    agProduct.href = "http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/addProduct.html?data=" + idUser;
}

fillListOrders();
fillInitial();