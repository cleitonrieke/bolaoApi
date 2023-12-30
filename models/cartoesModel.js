import { Sequelize } from "sequelize";
import db from "../db.js";

export default db.define("cartao", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  indice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  numeros: {
    type: Sequelize.STRING,
    allowNull: false,    
  },
});