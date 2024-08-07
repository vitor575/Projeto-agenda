const mongoose = require('mongoose');
const validator = require('validator');

const ContatoScheema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ""},
    email: {type: String, required: false, default: ""},
    telefone: Number,
    criadoEm: {type: Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoScheema);


function Contato (body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.buscaPorId = async function (id) {
    if(typeof id !== 'string') return;
    const user = await ContatoModel.findById(id);
    return user
}

Contato.prototype.register = async function () {
    this.valida();

    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
    this.CleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido');

    if(!this.body.nome) this.errors.push("Nome é um campo obrigatório!");
    if(!this.body.email && !this.body.telefone) {
        this.errors.push("É necessário pelo menos um e-mail ou telefone.")
    };

};

Contato.prototype.CleanUp = function () {

    for (let key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = ""
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
        
    };
}

Contato.prototype.edit = async function(id) {
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
  };

module.exports = Contato;