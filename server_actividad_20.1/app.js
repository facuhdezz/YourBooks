const express = require("express");
const app = express();
app.use(express.json());

const jwt = require("jsonwebtoken");
const secret = 'secreta clave';

const userRouter = require("./routes/usersRoutes");

const path = require('path');

const port = 3000;

const cors = require('cors');
const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "*",
                    credentials: true
                }
            ]
        }
    }
}

app.use(cors(
    config.application.cors.server
));

app.get("/", (req, res) => {
    res.send('<h1>Bienvenido al servidor</h1>');
});

app.use("/user", userRouter);

app.use("/pdfs", (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers["access-token"], secret);
        console.log(decoded);
        next();
    } catch (err) {
        res.status(401).json({ message: "Usuario no autorizado" });
    }
});

app.get("/pdfs/:titulo", (req, res) => {
    const titulo = req.params.titulo;
    const filePath = path.join(__dirname, 'pdfs', titulo);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error al enviar el archivo' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});