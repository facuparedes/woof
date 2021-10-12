const {
  models: { Temperament },
  conn,
} = require("../../src/db.js");

describe("Temperament model", () => {
  before(() => conn.authenticate().catch((err) => console.error("Unable to connect to the database:", err)));

  describe("Validators", () => {
    beforeEach(() => Temperament.sync({ force: true }));

    describe("name", () => {
      it("Should throw an error if `name` is null", (done) => {
        Temperament.create({})
          .then(() => done(new Error("`name` can't be null")))
          .catch(() => done());
      });

      it("Should throw an error if `name` is not unique", () => {
        return new Promise(async (resolve, reject) => {
          await Temperament.create({ name: "name" });
          await Temperament.create({ name: "name" })
            .then(() => reject(new Error("`name` must be unique")))
            .catch(resolve);
        });
      });
    });
  });

  after(() => Temperament.sync({ force: true }));
});
