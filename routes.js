import express from "express";
import bolaoController from "./controllers/bolaoController.js";
import { check } from "express-validator";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ name: "Ciclano Fulano" });
});
routes.get("/boloes", bolaoController.findAll);
routes.post("/bolao", bolaoController.addBolao);
routes.get("/numeros", bolaoController.findNumbers)
routes.get("/geranumeros", [
  check('intervalo_forte').not().isEmpty().isInt(),
  check('intervalo_fraco').not().isEmpty().isInt(),
  check('qtd_cartoes').not().isEmpty().isInt(),
  check('qtd_fortes').not().isEmpty().isInt(),
  check('qtd_medias').not().isEmpty().isInt(),
  check('qtd_fracas').not().isEmpty().isInt()
], bolaoController.geraNumeros)
routes.post("/registrarcartoes", bolaoController.registrarCartoes)
routes.get("/listarcartoes", bolaoController.listarCartoes)

export { routes as default };