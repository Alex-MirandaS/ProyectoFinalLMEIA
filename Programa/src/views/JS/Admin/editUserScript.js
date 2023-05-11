//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data1');
const idUserEdit = urlParams.get('data2');
var reportes = document.getElementById('reportes');
var newUser = document.getElementById('newUser');
var editUser = document.getElementById('editUser');
//IMPORTS DEL SCRIPT

const button = document.getElementById('button');
const contenedor = document.getElementById('contenedor');
const contenedorUP = document.getElementById('contenedorUP');


function fillTypeUsers() {

    let template = templateTypeUsers.content.cloneNode(true);
    var typeUsers = template.getElementById('typeUsers');
    var op1 = document.createElement("option");
    var op2 = document.createElement("option");
    var package = document.createTextNode('Package');
    var admin = document.createTextNode('Admin'); //cambiar
    op1.appendChild(package);
    op2.appendChild(admin);
    typeUsers.appendChild(op1);
    typeUsers.appendChild(op2);
    contenedor.appendChild(template);


    fetch('http://localhost:3000/api/getUser/' + idUserEdit)
        .then(response => response.json())
        .then(response => {
            const user = response;
            var template = templateUP.content.cloneNode(true);
            var username = template.getElementById("username");
            var password = template.getElementById("password");
            username.value = user.name;
            password.value = user.password;
            contenedorUP.appendChild(template);


            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (username.value == "" || password.value == "") {
                    alert('Llene los campos vacios');
                } else if (username.value == user.name && password.value == user.password && typeUsers.value == user.rol) {
                    alert('No ha cambiado ningun dato');
                } else {

                    const data = {
                        "idUser": idUserEdit,
                        "name": username.value,
                        "password": password.value,
                        "rol": typeUsers.value
                    }

                    fetch('http://localhost:3000/api/editUser', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(response => response.json())
                        .then(response => {

                            console.log(response);
                            if (response.idUser != '') {
                                alert('Se ha actualizado la información del usuario: ' + username.value + ', con el rol de: ' + typeUsers.value);
                                window.location.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/listUsers.html?data=" + idUser;
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

function fillInitial() {
    reportes.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/reportes.html?data=" + idUser;
    newUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/newUser.html?data=" + idUser;
    editUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/listUsers.html?data=" + idUser;
}

fillTypeUsers();
fillInitial();