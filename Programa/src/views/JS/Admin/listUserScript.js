//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var reportes = document.getElementById('reportes');
var newUser = document.getElementById('newUser');
var editUser = document.getElementById('editUser');
//IMPORTS DEL SCRIPT
var containerProducts = document.getElementById("container");

function fillData() {

    fetch('http://localhost:3000/api/getCustomeServices')
        .then(response => response.json())
        .then(response => {

            const users = response;

            for (let index = 0; index < users.length; index++) {
                const temp = users[index];
                let template = templateUsers.content.cloneNode(true);
                let id = template.getElementById('id');
                let name = template.getElementById('name');
                let password = template.getElementById('password');
                let rol = template.getElementById('rol');
                let wallet = template.getElementById('wallet');
                let editInfo = template.getElementById('editInfo');

                id.innerHTML = temp.idUser,
                    name.innerHTML = temp.name,
                    password.innerHTML = temp.password,
                    rol.innerHTML = temp.rol,
                    wallet.innerHTML = 'Q' + temp.wallet,

                    editInfo.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.location.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/editUser.html?data1=" + idUser + "&data2=" + temp.idUser;
                    })
                container.appendChild(template);
            }
        })
        .catch(error => console.error(error));
}

function fillInitial() {
    reportes.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/reportes.html?data=" + idUser;
    newUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/newUser.html?data=" + idUser;
    editUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/listUsers.html?data=" + idUser;
}

fillData();
fillInitial();