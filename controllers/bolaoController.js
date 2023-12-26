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

async function findNumbers(req, res){
    const numeros = []
    for (let i=0 ; i<60 ;i++){
        numeros.push(0)
    }
    
    const boloes = await BolaoRepository.findAll({order: ['nome']})
    boloes.forEach(bolao => {
        const numerosSelecionados = bolao.numeros
        let tokens = numerosSelecionados.split(",")
        tokens.forEach(num => {
            numeros[num-1] ++
        })
    })

    res.json(numeros)
}

export default { findAll, addBolao, findNumbers }; 