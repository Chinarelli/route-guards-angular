const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); 
const express = require('express'); 
require("dotenv-safe").config();

const { autenticaUsuario, logoutUsuario, validJWT } = require('./auth')

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

app.get('/', validJWT,(req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
});

app.get('/clientes', validJWT, (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'chinarelli'}]);
});

app.route('/api/login').post(autenticaUsuario);
app.route('/api/logout').post(logoutUsuario);

const server = http.createServer(app); 
server.listen(3000);
console.log("Servidor escutando na porta 3000...")

//https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
//https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/