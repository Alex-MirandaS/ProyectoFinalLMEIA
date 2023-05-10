const user = document.getElementById('username');
const psswrd = document.getElementById('password');
const confpsswrd = document.getElementById('confpassword');
const button = document.getElementById('button');

button.addEventListener('click', (e) => {
    e.preventDefault();
    register();
})

function register() {

    if (psswrd.value == "" || confpsswrd.value == "" || user.value == "") {
        alert('Llene la información requerida');
    } else if (psswrd.value != confpsswrd.value) {
        alert('La contraseña no coincide con la verificación');
    } else {
        const data = {
            "name": user.value,
            "password": psswrd.value
        }

        fetch('http://localhost:3000/api/addCommonUser', {
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
                    window.location.replace('http://127.0.0.1:5500/Programa/src/views/HTML/login.html');
                } else {
                    alert('Usuario o Contraseña Incorrecta');
                    location.reload();
                }
            })
            .catch(error => console.error(error));

    }

}