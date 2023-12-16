//NOTE here is, application startup and server processors

const express =require('express'),

cors = require('cors'); 
const parser = require("body-parser");
const customerRouter = require('./rootes/customerRouter');
const orderRouter = require('./rootes/orderRouter');
const deliveryRouter = require('./rootes/deliveryRouter');
const app = express();
const foodRouter = require('./rootes/foodRouter');
const categoriesRouter = require('./rootes/categoriesRouter');
const userRouter = require('./rootes/userRoutes');
const paymentRouter=require('./rootes/paymentsRouter');
const reviewRouter=require('./rootes/reviewRouter');
const dashRouter = require('./rootes/dashboardRoutes');


// const { readPayments } = require('./controllers/payments');

app.use(express.json());
app.use(parser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());



app.use('/foods', foodRouter)
app.use("/customers", customerRouter);
app.use('/categories', categoriesRouter)
app.use("/",deliveryRouter)
app.use("/orders",orderRouter)
app.use("/users",userRouter)
app.use("/payments", paymentRouter);
app.use("/review",reviewRouter);
app.use("/dashboard",dashRouter);

app.use((req, res) => {
  res.send({
    status: false,
    description: "The requested endpoint does not exist. (404)",
  });
});

// listen port url -> http://localhost:4200/
const PORT= 4200
app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}/`);
})

