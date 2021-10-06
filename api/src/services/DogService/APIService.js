const axios = require("axios");
const { API_URL } = require("../../config");

class APIService {
  /**
   * Parse strings with ranges and calculate average value
   *
   * @private
   * @param {string} string
   * @returns {string}
   */
  static __calcAverageFromString(string) {
    const stringValues = string.replace(/[^0-9.-]+/g, "").split("-");
    return stringValues.reduce((acc, curr) => (acc += parseInt(curr)), 0) / (stringValues.length > 1 ? 2 : 1);
  }

  /**
   * Get all breeds data from API and parse them.
   *
   * @private
   * @param {(parsedData: {id: string, name: string, temperaments: Array<string>, image: { id: string, url: string }, weight: number, height: number, life_span: number}) => {}} [customMapReturn]
   * @returns {Promise<Array<{id: string, name: string, temperaments: Array<string>, image: { id: string, url: string }, weight: number, height: number, life_span: number}>>}
   */
  static async __getAllData(customMapReturn) {
    return axios
      .get(`${API_URL}/breeds`)
      .then((res) => res.data)
      .then((data) =>
        data.map(({ id, name, temperament, image, weight, height, life_span }) => {
          const parsedTemperament = temperament?.split(", ").sort() ?? [];
          const parsedImage = { id: image.id, url: image.url };
          const [averageWeight, averageHeight, averageLifeSpan] = [this.__calcAverageFromString(weight.metric), this.__calcAverageFromString(height.metric), this.__calcAverageFromString(life_span)];
          const parsedData = { id, name, temperaments: parsedTemperament, image: parsedImage, weight: averageWeight, height: averageHeight, life_span: averageLifeSpan };

          return customMapReturn ? customMapReturn(parsedData) : parsedData;
        })
      );
  }

  //////////////////////////

  /**
   * Get all temperaments from API.
   *
   * These are extracted from `breeds` endpoint because API doesn't provide a `temperaments` endpoint.
   * That is why we need to parse all breeds and extract all temperaments and then remove duplicates.
   *
   * It's **strongly** recommended to use this method only one time (ex. at server start).
   *
   * @returns {Promise<Array<string>>}
   */
  static async getAllTemperaments() {
    return this.__getAllData(({ temperaments }) => temperaments).then((temperaments) => [...new Set(temperaments.flat())]);
  }

  /**
   * Get all breeds from API and parse them.
   *
   * @returns {Promise<Array<{id: string, name: string, temperaments: Array<string>, image: { id: string, url: string }, weight: string}>>}
   */
  static async getAllBreeds() {
    return this.__getAllData(({ id, name, temperaments, image, weight }) => ({ id, name, temperaments, image, weight }));
  }

  /**
   * Get all breeds from API filtered by name and parse them.
   *
   * @param {string} breedName
   * @returns {Promise<Array<{id: string, name: string}>>}
   */
  static async getBreedByName(breedName) {
    return axios
      .get(`${API_URL}/breeds/search?name=${breedName}`)
      .then((res) => res.data)
      .then((data) => data.map(({ id, name }) => ({ id, name })));
  }

  /**
   * Get all breeds from API filter by id and parse them.
   *
   * @param {string} id
   * @returns {Promise<{id: string, name: string, temperaments: Array<string>, image: { id: string, url: string }, weight: number, height: number, life_span: number}>}
   */
  static async getBreedById(id) {
    return this.__getAllData().then((data) => data.find((breed) => `${breed.id}` === id) ?? {});
  }
}

module.exports = APIService;
