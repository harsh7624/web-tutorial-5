const express =  require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use("/" ,(req,res) => {
//     res.send("Working!!");
// })

const userRoute = require("./api/routes/userRoute");
app.use("/users",userRoute);

module.exports = app;