exports.middlewareGlobal = (req,res,next) => {
    res.locals.whatever = "qualquer cois";
 next()
};

exports.checkCsrf = (err, req, res, next) => {
    if(err && err.code === "EBADCSRDTOKEN"){
        return res.send('BAD CSRF');
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};