//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var reportes = document.getElementById('reportes');
var newUser = document.getElementById('newUser');
var editUser = document.getElementById('editUser');
//IMPORTS DEL SCRIPT
var containerReports = document.getElementById("containerReports");

function fillReports() {
    generateReport('Top 10 productos más vendidos', 'R1');
    generateReport('Top 5 clientes que más ganancias por compras han generado', 'R2');
    generateReport('Top 5 clientes que más productos han vendido', 'R3');
    generateReport('Top 10 clientes que más pedidos han realizado', 'R4');
    generateReport('Top 10 clientes que más productos tienen a la venta', 'R5');
}

function generateReport(nameReportText, idReport) {

    let template = templateReport.content.cloneNode(true);
    let nameReport = template.getElementById('nameReport');
    let irReporte = template.getElementById('irReporte');

    nameReport.innerHTML = nameReportText;

    irReporte.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/report.html?data1=" + idUser + "&data2=" + idReport;
    })

    containerReports.appendChild(template);
}



function fillInitial() {
    reportes.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/reportes.html?data=" + idUser;
    newUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/newUser.html?data=" + idUser;
    editUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/listUsers.html?data=" + idUser;
}

fillReports();
fillInitial();