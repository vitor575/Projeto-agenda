exports.middlewareGlobal = (req,res,next) => {
    res.locals.whatever = "qualquer cois";
 next()
};

exports.checkCsrf = (err, req, res, next) => {
    if(err){
        return res.render('404');
    }

    next()
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};