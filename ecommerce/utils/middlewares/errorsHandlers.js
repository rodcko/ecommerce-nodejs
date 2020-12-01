const Sentry = require("@sentry/node");
const { config } = require('../../config');

Sentry.init({ dsn: "https://732b2b0d309e497f9009c776f1f080bb@o484262.ingest.sentry.io/5537191", });

function logErrors(err, req, res, next) {
    // Incluimos Sentry
    Sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    // catch errors for AJAX request
    if (req.xhr) {
        res.status(500).json({ err: err.message });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    // catch errors while streaming
    if (res.headersSent) {
        next(err);
    }

    if (!config.dev) {
        delete err.stack;
    }

    res.status(err.status || 500);
    res.render("error", {error: err});
}

module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
};