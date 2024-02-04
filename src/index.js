const express = require("express")
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = process.env.port || 3000

const Astros = mongoose.model('Astros', {
    nome: String,
    tipo: String,
    foto_url: String,
    descricao: String,
    link_url: String
});

app.get("/", async (req, res) => {
    const astros = await Astros.find()
    return res.send(astros)
})

app.delete("/:id", async (req, res) => {
    const astros = await Astros.findByIdAndDelete(req.params.id)
    return res.send(astros)
})

app.put("/:id", async (req, res) => {
    const astros = await Astros.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        tipo: req.body.tipo,
        foto_url: req.body.foto_url,
        descricao: req.body.descricao,
        link_url: req.body.link_url
    }, {
        new: true
    })
    return res.send(astros)
})

app.post("/", async (req, res) => {
    const astros = new Astros({
        nome: req.body.nome,
        tipo: req.body.tipo,
        foto_url: req.body.foto_url,
        descricao: req.body.descricao,
        link_url: req.body.link_url
    })
    await astros.save()
    return res.send(astros)
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://angelorodrigues:1LNvHmE4yzKGZ1ZT@text-api.mpqjkmv.mongodb.net/?retryWrites=true&w=majority');
    console.log('App running')
})
