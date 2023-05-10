//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var pedidos = document.getElementById('pedidos');
var entregados = document.getElementById('entregados');
var solIngreso = document.getElementById('aprobarProduct');
//IMPORTS DEL SCRIPT
var containerProducts = document.getElementById("containerProducts");

function fillRequestProducts() {

    fetch('http://localhost:3000/api/getRequestProducts')
        .then(response => response.json())
        .then(response => {
            const arrayProducts = response;
            for (let index = 0; index < arrayProducts.length; index++) {

                let template = templateSolicIng.content.cloneNode(true);
                let idProduct = template.getElementById('idProduct');
                let idOwner = template.getElementById('idOwner');
                let productName = template.getElementById('productName');
                let price = template.getElementById('price');
                let category = template.getElementById('category');
                let description = template.getElementById('description');
                let agregar = template.getElementById('agregar');
                const temp = arrayProducts[index];
                idProduct.innerHTML = temp.idProduct;
                price.innerHTML = 'Q' + temp.price;
                idOwner.innerHTML = temp.idOwner;
                productName.innerHTML = temp.productName;
                category.innerHTML = temp.category;
                description.innerHTML = temp.description;
                containerProducts.appendChild(template);
                //BOTON
                agregar.addEventListener('click', (e) => {
                    e.preventDefault();

                    const data = {
                        idProduct: temp.idProduct
                    }

                    fetch('http://localhost:3000/api/aceptedProduct', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(response => {
                            if (response.status == 'accepted') {
                                location.reload();
                            }
                        })
                })

            }
        })
        .catch(error => console.error(error));

}

function fillInitial() {
    pedidos.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/pedidos.html?data=" + idUser;
    entregados.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/entregados.html?data=" + idUser;
    solIngreso.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Package/solicitudIngreso.html?data=" + idUser;
}

fillRequestProducts();
fillInitial();