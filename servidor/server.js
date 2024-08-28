require("dotenv").config();
const app = require("../src/app");

app.use((req, res, next)=>{
    next();
});

let port = process.env.API_PORT || 3000;

app.listen(port);

console.log("DB HOST: "+process.env.DB_HOST);   
console.log("abriu aqui: " + port);