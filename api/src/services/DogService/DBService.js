const { FindOptions, Op } = require("sequelize");
const {
  models: { Breed, Temperament },
  conn,
} = require("../../db");
const APIService = require("./APIService");

class DBService {
  /**
   * Check if there are already `temperaments` in DB, if not, fetch API and use it to create them.
   *
   * @returns {Promise<void>}
   */
  static async syncDBTemperaments() {
    return Temperament.findOne().then(async (temperament) => {
      if (temperament) return;
      await APIService.getAllTemperaments()
        .then((temperaments) => temperaments.map((temperament) => ({ name: temperament })))
        .then((temperaments) => Temperament.bulkCreate(temperaments, { ignoreDuplicates: true }));
    });
  }

  /**
   * Get all `temperaments` from DB.
   * DB should be already synced with `DBService.syncDBTemperaments()` before using this method.
   *
   * @returns {Promise<Array<{id: string, name: string}>>}
   */
  static async getAllTemperaments() {
    return Temperament.findAll({ attributes: ["id", "name"] });
  }

  /**
   * Get all breeds from DB and parse them.
   *
   * @param {FindOptions<any>} [customOptions]
   * @returns {Promise<Array<{id: string, name: string, temperaments: Array<string>, weight: string}>>}
   */
  static async getAllBreeds(customOptions = {}) {
    return Breed.findAll({
      attributes: ["id", "name", "weight"],
      include: { model: Temperament, attributes: ["name"], through: { attributes: [] } },
      ...customOptions,
    }).then((breeds) => breeds.map((breed) => breed && Object.assign(breed.toJSON(), { temperaments: breed["temperaments"].map((temperament) => temperament.name) })));

    // return Breed.findAll({
    //   attributes: ["id", "name", "weight", [sequelize.fn("array_agg", sequelize.col("temperaments.name")), "temperamentsArray"]],
    //   include: { model: Temperament, attributes: [], through: { attributes: [] } },
    //   group: ["breed.id"],
    // }).then((breeds) =>
    //   /** issue: https://github.com/sequelize/sequelize/issues/12021 */
    //   breeds.map((breed) => {
    //     const jsonBreed = breed.toJSON();
    //     delete Object.assign(jsonBreed, { temperaments: jsonBreed["temperamentsArray"] })["temperamentsArray"];

    //     return jsonBreed;
    //   })
    // );
  }

  /**
   * Get all breeds from DB filtered by name.
   *
   * @param {string} breedName
   * @returns {Promise<Array<{id: string, name: string}>>}
   */
  static async getBreedByName(breedName) {
    return Breed.findAll({ attributes: ["id", "name"], where: { name: { [Op.iLike]: `%${breedName}%` } } });
  }

  /**
   * Get all breeds from DB, filter by id and parse them.
   *
   * @param {string} id
   * @returns {Promise<{id: string, name: string, temperaments: Array<string>, weight: number, height: number, life_span: number}>}
   */
  static async getBreedById(id) {
    return this.getAllBreeds({ attributes: { exclude: ["createdAt", "updatedAt"] }, where: { id }, limit: 1 }).then((breeds) => breeds[0] ?? {});
  }

  /**
   * Create a transaction to create a new breed in DB and then add `temperaments` to the relation.
   *
   * @param {string} name
   * @param {string} height
   * @param {string} weight
   * @param {string} life_span
   * @param {Array<string>} temperaments
   * @returns {Promise<{id: string, name: string, temperaments: Array<string>, weight: number, height: number, life_span: number, createdAt: Date, updatedAt: Date}>}
   */
  static async createBreed(name, height, weight, life_span, temperaments) {
    if (!Array.isArray(temperaments)) throw new Error("temperaments must be an array");
    temperaments = [...new Set(temperaments)].sort();

    return conn.transaction(async (transaction) => {
      const [fetchedBreed, fetchedTemperaments] = await Promise.all([
        Breed.create({ name, height, weight, life_span }, { transaction }),
        Temperament.findAll({ where: { name: { [Op.in]: temperaments } }, transaction }),
      ]);

      if (fetchedTemperaments.length !== temperaments.length) throw new Error("One or more temperaments are invalid");

      await fetchedBreed.addTemperaments(fetchedTemperaments, { transaction });
      return Object.assign(fetchedBreed.toJSON(), { temperaments });
    });
  }
}

module.exports = DBService;
