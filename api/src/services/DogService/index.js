const APIService = require("./APIService");
const DBService = require("./DBService");

class DogService {
  static syncDBTemperaments = async () => DBService.syncDBTemperaments();

  static getAllTemperaments = async () => DBService.getAllTemperaments();

  static async getAllBreeds() {
    return Promise.all([APIService.getAllBreeds(), DBService.getAllBreeds()]).then((breeds) => breeds.flat().sort((a, b) => a.name?.localeCompare(b.name) ?? 0));
  }

  static async getBreedByName(breedName) {
    return Promise.all([APIService.getBreedByName(breedName), DBService.getBreedByName(breedName)]).then((breeds) => breeds.flat().sort((a, b) => a.name?.localeCompare(b.name) ?? 0));
  }

  static async getBreedById(id) {
    if (!id.match(/[a-z]/gi)) return APIService.getBreedById(id);
    return DBService.getBreedById(id);
  }

  static createBreed = async (name, height, weight, life_span, temperaments) => DBService.createBreed(name, height, weight, life_span, temperaments);
}

module.exports = DogService;
