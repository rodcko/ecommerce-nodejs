const boom = require('@hapi/boom');
const Sentry = require("@sentry/node");
const { config } = require('../../config');
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi');

Sentry.init({ dsn: "https://732b2b0d309e497f9009c776f1f080bb@o484262.ingest.sentry.io/5537191", });

function withErrorStack(err, stack) {
    if (config.dev) {
        return { ...err, stack} // Object.assign({}, err, stack)
    }
}

function logErrors(err, req, res, next) {
    // Incluimos Sentry
    Sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

// Implementando boom
function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
}

function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;

    // catch errors for AJAX request or if an error ocurrs while streaming
    if (isRequestAjaxOrApi(req) || res.headersSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack));
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {    
    const {
        output: { statusCode, payload }
    } = err;

    res.status(statusCode);
    res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
};