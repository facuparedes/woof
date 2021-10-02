const { Sequelize, DataTypes } = require("sequelize");

/**@param {Sequelize} sequelize */
module.exports = (sequelize) =>
  sequelize.define("breed", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    height: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.INTEGER, allowNull: false },
    life_span: { type: DataTypes.INTEGER },
  });
