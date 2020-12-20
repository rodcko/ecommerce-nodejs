const express = require('express');
const path = require("path");
const boom = require("@hapi/boom");
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require("./routes/api/auth");

//const bodyParse = require('body-parse');

const {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
} = require('./utils/middlewares/errorsHandlers')

const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');

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
productsRouter(app);
app.use("/api/auth", authApiRouter);

// redirect
app.get('/', function(req, res) {
    res.redirect('/products');
});

app.use(function(req, res, next) {
    if(isRequestAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound();

        res.status(statusCode).json(payload);
    }

    res.status(404).render("404");
});

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// server
const server = app.listen(8000, function(){
    console.log(`Listening http://localhost:${server.address().port}`);
});

