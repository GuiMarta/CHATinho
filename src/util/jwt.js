const jwt = require('jsonwebtoken');
//codigo do token:

async function checkToken (token, id, key){
    return jwt.verify(token, key, (err, decoded) => {
        let auth = false;
        if(err){
            auth = false;
        }
        if(decoded){
            if(decoded.id == id){
                auth = true;
            }
            else{
                auth = false;
            }
        }
        return auth;
    }
)};

async function setToken (id, key) {
    console.log("id: "+id);
    if(id){
        return jwt.sign({id}, key, {expiresIn: 50000});
    }
    return false;
}
module.exports = {checkToken,setToken}