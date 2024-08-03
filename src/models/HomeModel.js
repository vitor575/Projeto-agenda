const mongoose = require('mongoose');

const HomeScheema = new mongoose.Schema({
    nome: String,
    idade: Number
});

const HomeModel = mongoose.model('Home', HomeScheema);
