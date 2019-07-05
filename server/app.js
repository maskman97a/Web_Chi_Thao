const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const assert = require('assert');
const session = require('express-session');

const UsersModel = require('./models/UsersModel');
const AdminRouter = require('./routers/AdminRouter');
const UsersRouter = require('./routers/UsersRouter');
const AuthRouter = require('./routers/AuthRouter');

const app = express();

app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "webchithao",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

app.get("/api", (req, res) => {
    try {
        if (req.session.userInfo == undefined) {
            res.status(200).json({ success: 1, roleId: '' });
        } else {
            res.status(200).json({ success: 1, userInfo: req.session.userInfo });
        }
    } catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});


app.use("/admin", AdminRouter);
app.use("/user", UsersRouter);


app.use(express.static('public'));
app.use(express.static('views'));

mongoose.connect("mongodb://localhost:27017/ChiThaoDB", { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    else console.log("Mongodb is connecting!");
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

const port = 1996;
app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log('Server is listening at ' + port + '!');
});
