import { Sequelize } from "sequelize";
import db from "../db.js";

export default db.define("bolao", {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numeros: {
    type: Sequelize.STRING,
    allowNull: false,    
  },
});