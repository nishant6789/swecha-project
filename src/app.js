const express = require("express");
const path = require("path")
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/user");
const { json } = require("express");
const port = process.env.PORT || 3000

const adminRoutes=require("./routes/admin/user");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);



app.use('/api',adminRoutes);

app.listen(port, () =>{
    console.log(`server is runningat port number ${port}`);
})