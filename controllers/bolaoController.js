import BolaoRepository from "../models/boloesModel.js";

async function findAll(req, res) {
  const boloes = await BolaoRepository.findAll({order: ['nome']});
  res.json(boloes);
}

async function addBolao(req, res) {
    const saida = await BolaoRepository.create({
      nome: req.body.nome,
      numeros: req.body.numeros,
    })
    res.json(saida);    
}

export default { findAll, addBolao }; 