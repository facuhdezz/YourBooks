function validationReg() {
    let formReg = document.getElementById('formReg');
    let password1 = document.getElementById('inputPassword1');
    let password2 = document.getElementById('inputPassword2');
    let userExists = document.getElementById('user-exists');

    formReg.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!formReg.checkValidity() || password1.value < 6 || password1.value != password2.value) {
            event.stopPropagation();
            console.log("invalidado");
        } else {
            console.log("validado");
            let user = await createUser(formReg);
            if(user === undefined || !user){                
                event.stopPropagation();
                console.log("el usuario ya existe");
                userExists.textContent = `El usuario ya existe`;
            } else {
                console.log("validado");
                window.location.href = "index.html";
            }
        }
        formReg.classList.add('was-validated');
    })
}

async function createUser(formReg) {
    let userArr = [];
    for (let i = 0; i < formReg.length; i++) {
        if (formReg[i].name !== "" && formReg[i].value !== "") {
            userArr.push([formReg[i].name, formReg[i].value]);
        }
    }
    const userObj = Object.fromEntries(userArr);
    console.log(userObj);
    try {
        let response = await fetch(`http://localhost:3000/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            return true;
        }
    } catch (err) {
        console.log(err);
    }
}

validationReg()

