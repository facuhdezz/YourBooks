async function f(email, password){
    let obj = {
        password: password
    }
    try {
        let response = await fetch(`http://localhost:3000/user/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        if(response.ok){
        let data = await response.json();
        localStorage.setItem('token', data.token);
        return true;
        }
    } catch(err) {
        console.log(err);
    }
}

function validationLogin(){
    let formLogin = document.getElementById('formLogin');
    let email = document.getElementById('emailLogin');
    let password = document.getElementById('passwordLogin');
    let accesoDenegado = document.getElementById('acceso-denegado');

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault();
        let user = await f(email.value, password.value);
        if(!formLogin.checkValidity() || user == undefined || !user){            
        event.stopPropagation();
        console.log('Acceso denegado');
        accesoDenegado.textContent = `email y/o contraseña incorrectos`;
        } else {
            console.log('Acceso permitido');
            window.location.href = "index.html";
        }
        formLogin.classList.add('was-validated');
    });
}

validationLogin();