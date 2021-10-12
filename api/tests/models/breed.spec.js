const {
  models: { Breed, Temperament },
  conn,
} = require("../../src/db.js");

describe("Breed model", () => {
  before(() => conn.authenticate().catch((err) => console.error("Unable to connect to the database:", err)));

  describe("Validators", () => {
    beforeEach(() => Breed.sync({ force: true }));

    describe("name", () => {
      it("Should throw an error if `name` is null", (done) => {
        Breed.create({ height: 10, weight: 10, life_span: 10 })
          .then(() => done(new Error("`name` can't be null")))
          .catch(() => done());
      });

      it("Should throw an error if `name` is not unique", () => {
        return new Promise(async (resolve, reject) => {
          await Breed.create({ name: "name", height: 10, weight: 10 });
          await Breed.create({ name: "name", height: 10, weight: 10 })
            .then(() => reject(new Error("`name` must be unique")))
            .catch(resolve);
        });
      });
    });

    describe("height", () => {
      it("Should throw an error if `height` is null", (done) => {
        Breed.create({ name: "test", weight: 10, life_span: 10 })
          .then(() => done(new Error("`height` can't be null")))
          .catch(() => done());
      });
    });

    describe("weight", () => {
      it("Should throw an error if `weight` is null", (done) => {
        Breed.create({ name: "test", height: 10, life_span: 10 })
          .then(() => done(new Error("`weight` can't be null")))
          .catch(() => done());
      });
    });

    describe("life_span", () => {
      it("Should create a new Breed if `life_span` is null", (done) => {
        Breed.create({ name: "test", height: 10, weight: 10 })
          .then(() => done())
          .catch(() => done(new Error("`life_span` can be null")));
      });
    });
  });

  describe("Relations", () => {
    beforeEach(() => Breed.sync({ force: true }));

    it("Should have a `temperament` relation", () => {
      return new Promise(async (resolve, reject) => {
        try {
          const newTemperament = await Temperament.create({ name: "testTemperament" });
          const newBreed = await Breed.create({ name: "testBreed", height: 10, weight: 10, life_span: 10 });
          await newBreed.addTemperaments(newTemperament).then(resolve).catch(reject);
        } catch (_) {
          reject(new Error("`temperament` relation not found"));
        }
      });
    });
  });

  after(() => Breed.sync({ force: true }));
});
