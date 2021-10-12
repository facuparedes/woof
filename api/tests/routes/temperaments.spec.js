// /* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const {
  models: { Temperament },
  conn,
} = require("../../src/db.js");

const agent = session(app);

describe("Temperament routes", () => {
  before(() => conn.authenticate().catch((err) => console.error("Unable to connect to the database:", err)));
  beforeEach(() => Temperament.sync({ force: true }).then(() => Temperament.create({ name: "name" })));

  describe("GET /temperaments", () => {
    it("Should get 200", () => agent.get("/temperaments").expect(200));

    it("Should return an array of temperaments", () =>
      new Promise((resolve, reject) => {
        agent
          .get("/temperaments")
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("array");
            expect(res.body[0]).to.have.property("id");
            expect(res.body[0]).to.have.property("name");

            return resolve();
          });
      }));
  });

  after(() => Temperament.sync({ force: true }));
});
