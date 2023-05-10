const user = document.getElementById('username');
const psswrd = document.getElementById('password');
const button = document.getElementById('button');
const register = document.getElementById('register');

button.addEventListener('click', (e) => {
    e.preventDefault();
    log();
})

register.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace('http://127.0.0.1:5500/Programa/src/views/HTML/register.html');
})

function log() {
    const data = {
        "name": user.value,
        "password": psswrd.value
    }

    fetch('http://localhost:3000/api/login', {
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
                if (response.rol == 'Common') {
                    window.location.replace('http://127.0.0.1:5500/Programa/src/views/HTML/MainPage/home.html?data=' + response.idUser);
                } else if (response.rol == 'Package') {
                    window.location.replace('http://127.0.0.1:5500/Programa/src/views/HTML/Package/pedidos.html?data=' + response.idUser);
                } else if (response.rol == 'Admin') {
                    window.location.replace('http://127.0.0.1:5500/Programa/src/views/HTML/Admin/home.html?data=' + response.idUser);
                }
            } else {
                alert('Usuario o Contraseña Incorrecta');
                location.reload();
            }

        })
        .catch(error => console.error(error));

}