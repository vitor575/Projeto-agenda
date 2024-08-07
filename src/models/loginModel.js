const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const LoginScheema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});



const LoginModel = mongoose.model('Login', LoginScheema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.Valida();

        if (this.errors.length > 0) return

        this.user = await LoginModel.findOne({email: this.body.email});

        if (!this.user) {
            this.errors.push("Usuário não existe.");
            return
        } 

        if(!bcrypt.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida.');
            this.user = null;
            return
        }
    }

    async register() {
        this.Valida();

        if (this.errors.length > 0) return

        await this.userExists();

        if (this.errors.length > 0) return


        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt)

        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        this.user = await LoginModel.findOne({email: this.body.email});

        if (this.user) this.errors.push("Usuário já existe.")
    }

    Valida() {
        this.CleanUp();

        if (!validator.isEmail(this.body.email)) {
            this.errors.push('Email inválido')
        };

        if (this.body.password.length < 3 || this.body.password.length > 35) {
            this.errors.push('A senha precisa ter no mínimo 3 caracteres e no máximo 35')
        }
    }

    CleanUp() {

        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ""
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}


module.exports = Login;