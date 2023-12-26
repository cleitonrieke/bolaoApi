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

    const saida = []
    for (let i=1; i<=60; i++){
        saida.push({ numero: i, qtd: numeros[i-1]})
    }
    let numerosOrdenados = saida.sort(
        (p1, p2) => (p1.qtd < p2.qtd) ? 1 : (p1.qtd > p2.qtd) ? -1 : 0);
    res.json(numerosOrdenados)
}

export default { findAll, addBolao, findNumbers }; 