import BolaoRepository from "../models/boloesModel.js";
import CartaoRepository from "../models/cartoesModel.js";
import { validationResult } from "express-validator";

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
    
    const numerosOrdenados = await recuperaNumerosOrdenados()

    res.json(numerosOrdenados)
}

async function geraNumeros(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const numerosOrdenados = await recuperaNumerosOrdenados()

    console.log(numerosOrdenados)
    
    const qtdMax = numerosOrdenados[0].qtd
    const qtdMin = numerosOrdenados[numerosOrdenados.length - 1].qtd
    const grupoForte = []
    const grupoFraco = []
    const grupoMedio = []    
    const intervalo_forte = parseInt(req.query.intervalo_forte)
    const intervalo_fraco = parseInt(req.query.intervalo_fraco)
    const qtd_cartoes = parseInt(req.query.qtd_cartoes)
    const qtd_fortes = parseInt(req.query.qtd_fortes)
    const qtd_medias = parseInt(req.query.qtd_medias)
    const qtd_fracas = parseInt(req.query.qtd_fracas)

    console.log(`Intervalo Forte ${intervalo_forte} e Fraco ${intervalo_fraco} e qtdMax ${qtdMax} e qtdMin ${qtdMin}`)
    numerosOrdenados.forEach(item => {
        if(item.qtd <= qtdMax && item.qtd >= (qtdMax - intervalo_forte)){
            grupoForte.push(item.numero)
        }
        else if (item.qtd >= qtdMin && item.qtd <= (qtdMin + intervalo_fraco)){
            grupoFraco.push(item.numero)
        }
        else {
            grupoMedio.push(item.numero)
        }
    })

    console.log('Grupo Forte')
    console.log(grupoForte)
    console.log('Grupo Fraco')
    console.log(grupoFraco)
    console.log('Grupo Medio')
    console.log(grupoMedio)

    const cartoes = []
    for(let i=0 ; i < qtd_cartoes ; i++){
        const cartao = []
        let continua = true
        while (continua){
            const pickItem = Math.floor(Math.random() * grupoForte.length)
            const numeroPego = grupoForte[pickItem]
            if (!cartao.includes(numeroPego)){
                cartao.push(numeroPego)
            }            
            if (cartao.length == qtd_fortes){
                continua = false
            }            
        }
        continua = true
        while (continua){
            const pickItem = Math.floor(Math.random() * grupoMedio.length)
            const numeroPego = grupoMedio[pickItem]
            if (!cartao.includes(numeroPego)){
                cartao.push(numeroPego)
            }            
            if (cartao.length == (qtd_fortes + qtd_medias)){
                continua = false
            }            
        }
        continua = true
        while (continua){
            const pickItem = Math.floor(Math.random() * grupoFraco.length)
            const numeroPego = grupoFraco[pickItem]
            if (!cartao.includes(numeroPego)){
                cartao.push(numeroPego)
            }            
            if (cartao.length >= (qtd_fortes + qtd_medias + qtd_fracas)){
                continua = false
            }            
        }
        cartao.sort((a, b) => { return a - b})
        cartoes.push(cartao)
    }

    console.log(cartoes)
    res.json(cartoes)
}

async function recuperaNumerosOrdenados(){
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
        (p1, p2) => (p1.qtd < p2.qtd) ? 1 : (p1.qtd > p2.qtd) ? -1 : 0)

    return numerosOrdenados
}

async function registrarCartoes(req, res){
    let qtdCartoes = 0
    req.body.forEach(async (cartao) => {
        console.log(`Cartao ${cartao.indice} : ${cartao.numeros}`)
        qtdCartoes++
        const saida = await CartaoRepository.create({
            indice: cartao.indice,
            numeros: cartao.numeros
        })
    })
    res.json({ mensagem: "Sucesso", qtdCartoes: qtdCartoes});    
}

async function listarCartoes(req, res){
    const cartoes = await CartaoRepository.findAll({order: ['indice']});
    res.json(cartoes);
}
export default { findAll, addBolao, findNumbers, geraNumeros, registrarCartoes, listarCartoes }; 