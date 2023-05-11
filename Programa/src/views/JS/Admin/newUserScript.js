//IMPORTS DE INICIO
const urlParams = new URLSearchParams(window.location.search);
const idUser = urlParams.get('data');
var reportes = document.getElementById('reportes');
var newUser = document.getElementById('newUser');
var editUser = document.getElementById('editUser');
//IMPORTS DEL SCRIPT
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');
const button = document.getElementById('button');
const contenedor = document.getElementById('contenedor');

function fillTypeUsers() {

    let template = templateTypeUsers.content.cloneNode(true);
    var typeUsers = template.getElementById('typeUsers');
    var op1 = document.createElement("option");
    var op2 = document.createElement("option");
    var package = document.createTextNode('Package');
    var admin = document.createTextNode('Admin');
    op1.appendChild(package);
    op2.appendChild(admin);
    typeUsers.appendChild(op1);
    typeUsers.appendChild(op2);
    contenedor.appendChild(template);


    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (username.value == "" || password.value == "" || confirmpassword.value == "") {
            alert('Llene los campos vacios');
        } else {

            if (password.value != confirmpassword.value) {
                alert('Las contraseñas no coinciden, por favor, revise los datos ingresados')
                confirmpassword.value = '';
            } else {
                const data = {
                    "name": username.value,
                    "password": password.value,
                    "rol": typeUsers.value,
                    "wallet": 0
                }

                fetch('http://localhost:3000/api/addUser', {
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
                            alert('Se ha registrado el usuario: ' + username.value + ', con el rol de: ' + typeUsers.value);
                            location.reload();
                        } else {
                            alert('Usuario o Contraseña Incorrecta');
                            location.reload();
                        }

                    })
                    .catch(error => console.error(error));
            }

        }
    })
}

function fillInitial() {
    reportes.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/reportes.html?data=" + idUser;
    newUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/newUser.html?data=" + idUser;
    editUser.href = "http://127.0.0.1:5500/Programa/src/views/HTML/Admin/listUsers.html?data=" + idUser;
}

fillTypeUsers();
fillInitial();