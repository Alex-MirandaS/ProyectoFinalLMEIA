//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var pedidos = document.getElementById('pedidos');
var entregados = document.getElementById('entregados');
var solIngreso = document.getElementById('aprobarProduct');
//IMPORTS DEL SCRIPT
var containerProducts = document.getElementById("containerProducts");

function fillListOrders() {

    fetch('http://localhost:3000/api/getListOrdersInCurs')
        .then(response => response.json())
        .then(response => {
            const arrayListOrders = response;
            for (let index = 0; index < arrayListOrders.length; index++) {

                let template = templateListOrders.content.cloneNode(true);
                let status = template.getElementById('status');
                let idListOrder = template.getElementById('idListOrder');
                let fechaEntrada = template.getElementById('fechaEntrada');
                let fechaSalida = template.getElementById('fechaSalida');
                //BOTONES
                let entregado = template.getElementById('entregado');
                let detalles = template.getElementById('detalles');
                const temp = arrayListOrders[index];
                status.innerHTML = temp.estado;
                idListOrder.innerHTML = temp.numOrder;
                fechaEntrada.innerHTML = temp.fechaEntrega + ' / ';
                fechaSalida.innerHTML = temp.fechaLlegada;

                entregado.addEventListener('click', (e) => {
                    e.preventDefault();

                    const data = {
                        idLOrders: temp.numOrder
                    }

                    fetch('http://localhost:3000/api/changeStatus', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(response => {
                            if (response.status == 'entregado') {
                                location.reload();
                            }
                        })
                })

                containerProducts.appendChild(template);
            }
        })
        .catch(error => console.error(error));

}

function fillInitial() {
    pedidos.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/pedidos.html?data=" + idUser;
    entregados.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/entregados.html?data=" + idUser;
    solIngreso.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/solicitudIngreso.html?data=" + idUser;
}

fillListOrders();
fillInitial();