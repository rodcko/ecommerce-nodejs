const express = require('express');
const path = require("path");
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
//const bodyParse = require('body-parse');

// app
const app = express();

// middlewares
app.use(express.json()); // Esto es porque ya express lo trae incluido y no hay que requerirlo como dependencia
//app.use(bodyParse.json());

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// redirect
app.get('/', function(req, res) {
    res.redirect('/products');
});

// server
const server = app.listen(8000, function(){
    console.log(`Listening http://localhost:${server.address().port}`);
});

