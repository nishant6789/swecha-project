const express = require("express");
const path = require("path")
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");
const port = process.env.PORT || 3000


const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req,res) =>{
    res.render("index")
});

app.get("/register", (req,res) =>{
    res.render("register");
})

app.get("/login", (req,res) =>{
    res.render("login");
})

// create a new user in our database
app.post("/register", async (req,res) =>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerUser = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword
            }) 

            const registered = await registerUser.save();
            res.status(201).render("index");

        }else{
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).send("You are already present in the database");
    }
})

// login check
app.post("/login", async(req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(`${email},${password}`)
        const useremail = await Register.findOne({email:email})// left email is database email and latter email is the login email of the userfor which we have to check
        
        if(useremail.password === password){
            res.status(201).render("index");
        }else{
            res.send("Invalid login details")
        }
    } catch (error) {
        res.status(400).send("Invalid Login Details");
    }
})

app.listen(port, () =>{
    console.log(`server is runningat port number ${port}`);
})