//NOTE here is, application startup and server processors

const express =require('express'),
cors = require('cors'); 
const app = express();
const foodRouter = require('./rootes/foodRouter')

app.use(express.json())

app.use('/', foodRouter)





// listen port url -> http://localhost:4200/
const PORT= 4200
app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}/`);
})

