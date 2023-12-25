import express from "express";
import bolaoController from "./controllers/bolaoController.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ name: "Ciclano Fulano" });
});
routes.get("/boloes", bolaoController.findAll);
routes.post("/bolao", bolaoController.addBolao);

export { routes as default };