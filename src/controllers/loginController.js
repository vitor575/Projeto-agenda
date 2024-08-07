const Login = require('../models/loginModel');

exports.index = (req, res) => {
    res.render('login')
};

exports.register = async function (req, res) {
    try {
        const login = new Login(req.body)
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login');
            });
            return;
        }

        req.flash('success', 'Seu usuário foi criado');
        req.session.save(function () {
            return res.redirect('/login');
        });

    } catch (e) {
        console.log(e)
        return res.render('404');
    }
}

exports.login = async function (req, res) {
    try {
        const login = new Login(req.body)
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login');
            });
            return;
        }


        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/');
        });

    } catch (e) {
        console.log(e)
        return res.render('404');
    }
}

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/')
}