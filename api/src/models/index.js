const { Sequelize } = require("sequelize");

Sequelize.prototype.loadModels = function (models) {
  if (!Array.isArray(models)) throw new Error("models must be an array");

  models.forEach((model) => model(this));
  return this;
};

module.exports = [require("./Breed"), require("./Temperament")];
