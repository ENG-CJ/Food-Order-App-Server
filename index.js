//NOTE here is, application startup and server processors

const express =require('express'),
cors = require('cors'); 
const router = require('./rootes/customerRouter');
const app = express();

app.get('/', function(req, res){
    return res.send({
        server : "use this endpoint for testing only",
        isRunning: true

    })
})

app.use("/customers",router)




// listen port url -> http://localhost:4200/
const PORT= 4200
app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}/`);
})

