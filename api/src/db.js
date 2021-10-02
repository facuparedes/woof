const { Sequelize } = require("sequelize");
const models = require("./models");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = require("./config");

/**@type {Sequelize} */
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, { logging: false }).loadModels(models);
const { Breed, Temperament } = (sequelize.models = Object.fromEntries(Object.entries(sequelize.models).map(([key, value]) => [`${key[0].toUpperCase()}${key.slice(1)}`, value])));

Breed.belongsToMany(Temperament, { through: "breed_temperament" });
Temperament.belongsToMany(Breed, { through: "breed_temperament" });

module.exports = { models: sequelize.models, conn: sequelize };

// const basename = path.basename(__filename);
// const modelDefiners = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, "/models"))
//   .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
//   .forEach((file) => modelDefiners.push(require(path.join(__dirname, "/models", file))));

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach((model) => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);
