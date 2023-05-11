//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data1');
const idReport = urlParams.get('data2');
var reportes = document.getElementById('reportes');
var newUser = document.getElementById('newUser');
var editUser = document.getElementById('editUser');
//IMPORTS DEL SCRIPT
var containerProducts = document.getElementById("container");
var containerColums = document.getElementById("containerColumns");
//TITULO
var containerTitle = document.getElementById("containerTitle");

function fillData() {

    fetch('http://localhost:3000/api/getReport/' + idReport)
        .then(response => response.json())
        .then(response => {

            const reports = response;

            for (let index = 0; index < reports.length; index++) {
                const temp = reports[index];
                let template = null;

                switch (idReport) {
                    case 'R1':
                        template = templateProducts.content.cloneNode(true);
                        let number = template.getElementById('number');
                        let sku = template.getElementById('sku');
                        let productName = template.getElementById('productName');
                        let amount = template.getElementById('amount');
                        number.innerHTML = (index + 1);
                        sku.innerHTML = temp._id,
                            productName.innerHTML = temp.nameProduct,
                            amount.innerHTML = temp.maxAmount
                        break;

                    case 'R3':
                        template = templateUsers.content.cloneNode(true);
                        let number1 = template.getElementById('number');
                        let username = template.getElementById('username');
                        let amount1 = template.getElementById('amount');
                        number1.innerHTML = (index + 1);
                        username.innerHTML = temp._id,
                            amount1.innerHTML = temp.numProducts
                        console.log(temp);
                        break;
                    case 'R4':
                        template = templateUsers.content.cloneNode(true);
                        let number2 = template.getElementById('number');
                        let username1 = template.getElementById('username');
                        let amount2 = template.getElementById('amount');
                        number2.innerHTML = (index + 1);
                        username1.innerHTML = temp.name,
                            amount2.innerHTML = temp.count
                        console.log(temp);
                        break;
                    case 'R5':
                        template = templateUsers.content.cloneNode(true);
                        let number3 = template.getElementById('number');
                        let username2 = template.getElementById('username');
                        let amount3 = template.getElementById('amount');
                        number3.innerHTML = (index + 1);
                        username2.innerHTML = temp.name,
                            amount3.innerHTML = temp.count
                        console.log(temp);
                        break;
                }

                container.appendChild(template);
            }
        })
        .catch(error => console.error(error));
}

function fillTitle() {
    let template = templateTitle.content.cloneNode(true);
    let templateColumns = null;
    let nameReport = template.getElementById('nameReport');
    let nameReportText = "";

    switch (idReport) {
        case 'R1':
            nameReportText = 'Top 10 productos más vendidos';
            templateColumns = templateTitleProducts.content.cloneNode(true);
            break;
        case 'R2':
            nameReportText = 'Top 5 clientes que más ganancias por compras han generado';
            break;
        case 'R3':
            nameReportText = 'Top 5 clientes que más productos han vendido';
            templateColumns = templateTitleUsers.content.cloneNode(true);
            break;
        case 'R4':
            nameReportText = 'Top 10 clientes que más pedidos han realizado';
            templateColumns = templateTitleUsers.content.cloneNode(true);
            break;
        case 'R5':
            nameReportText = 'Top 10 clientes que más productos tienen a la venta';
            templateColumns = templateTitleUsers.content.cloneNode(true);
            break;
    }

    nameReport.innerHTML = nameReportText,
        containerTitle.appendChild(template);
    containerColums.appendChild(templateColumns);

}

function fillInitial() {
    reportes.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/reportes.html?data=" + idUser;
    newUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/newUser.html?data=" + idUser;
    editUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/listUsers.html?data=" + idUser;
}

fillData();
fillTitle();
fillInitial();