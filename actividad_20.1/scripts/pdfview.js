let token = localStorage.getItem("token");

async function pdfView(value) {
    const url = `http://localhost:3000/pdfs/${value}.pdf`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'access-token': `${token}`
        }
    });
    if (response.ok) {
        const blob = await response.blob();

        const blobUrl = URL.createObjectURL(blob);

        const newWindow = window.open();

        newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Visor de PDF</title>
                    <style>
                        body, html {
                            margin: 0;
                            padding: 0;
                            overflow: hidden;
                            height: 100%;
                        }
                        embed {
                            width: 100%;
                            height: 100%;
                        }
                    </style>
                </head>
                <body>
                    <embed src="${blobUrl}" type="application/pdf" width="100%" height="100%">
                </body>
                </html>
            `);
        newWindow.innerWidth = newWindow.document.documentElement.scrollWidth;
        newWindow.innerHeight = newWindow.document.documentElement.scrollHeight;
    } else {
        alert('Usuario no autorizado, vuelva a iniciar sesión')
    }
}

const pdfForm = document.getElementsByClassName('pdf-download');

for (let form of pdfForm) {
    let button = form[0].value;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        pdfView(button);
    })
}