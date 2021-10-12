// /* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const {
  models: { Breed, Temperament },
  conn,
} = require("../../src/db.js");

const agent = session(app);
const breed = {
  name: "Pug",
  name: "test",
  height: 10,
  weight: 10,
  life_span: 10,
};

describe("Breed routes", () => {
  let breedID;
  before(() => conn.authenticate().catch((err) => console.error("Unable to connect to the database:", err)));
  beforeEach(() =>
    Breed.sync({ force: true }).then(async () => {
      breedID = (await Breed.create(breed)).id;
    })
  );

  describe("GET /breeds", () => {
    it("Should get 200", () => agent.get("/breeds").expect(200));

    it("Should return an array of breeds with `id`, `name`, `temperaments`, `image`, `weight`.", () =>
      new Promise((resolve, reject) => {
        agent
          .get("/breeds")
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("array");
            expect(res.body[0]).to.have.property("id");
            expect(res.body[0]).to.have.property("name");
            expect(res.body[0]).to.have.property("temperaments");
            expect(res.body[0].temperaments).to.be.an("array");
            expect(res.body[0]).to.have.property("image");
            expect(res.body[0].image).to.be.an("object");
            expect(res.body[0]).to.have.property("weight");
            return resolve();
          });
      }));
  });

  describe("GET /breeds/:id", () => {
    it("Should return only one object from DB", () =>
      new Promise((resolve, reject) => {
        agent
          .get(`/breeds/${breedID}`)
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("id");
            expect(res.body).to.have.property("name");
            expect(res.body).to.have.property("temperaments");
            expect(res.body.temperaments).to.be.an("array");
            expect(res.body).to.have.property("weight");
            expect(res.body).to.have.property("height");
            expect(res.body).to.have.property("life_span");
            return resolve();
          });
      }));

    it("Should return only one object from API", () =>
      new Promise((resolve, reject) => {
        agent
          .get(`/breeds/1`)
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("id");
            expect(res.body).to.have.property("name");
            expect(res.body).to.have.property("temperaments");
            expect(res.body.temperaments).to.be.an("array");
            expect(res.body).to.have.property("weight");
            expect(res.body).to.have.property("height");
            expect(res.body).to.have.property("life_span");
            return resolve();
          });
      }));

    it("Should return an error 500 if ID is not found on DB", () => agent.get(`/breeds/notAValidID`).expect(500));

    it("Should return an empty object if ID is not found on API", () =>
      new Promise((resolve, reject) => {
        agent
          .get(`/breeds/0`)
          .expect(200)
          .end((err, res) => {
            if (err) return reject(err);

            expect(res.body).to.be.an("object");
            expect(res.body).to.not.have.property("id");
            expect(res.body).to.not.have.property("name");
            expect(res.body).to.not.have.property("temperaments");
            expect(res.body).to.not.have.property("weight");
            expect(res.body).to.not.have.property("height");
            expect(res.body).to.not.have.property("life_span");
            return resolve();
          });
      }));
  });

  describe("POST /breeds", () => {
    it("Should create new breed on DB and return it.", () => {
      return new Promise(async (resolve, reject) => {
        try {
          await Temperament.create({ name: "temperamentName" });
          await agent
            .post("/breeds")
            .send({ ...breed, name: "another test", temperaments: ["temperamentName"] })
            .expect(200)
            .then(async (res) => {
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("id");
              expect(res.body).to.have.property("name");
              expect(res.body).to.have.property("temperaments");
              expect(res.body.temperaments).to.be.an("array");
              expect(res.body.temperaments[0]).to.be.equal("temperamentName");
              expect(res.body).to.have.property("weight");
              expect(res.body).to.have.property("height");
              expect(res.body).to.have.property("life_span");

              await Breed.findByPk(res.body.id).then((breed) => {
                expect(breed.toJSON()).deep.include({ id: res.body.id, name: res.body.name, weight: res.body.weight, height: res.body.height, life_span: res.body.life_span });
              });
            });
          return resolve();
        } catch (err) {
          return reject(err);
        }
      });
    });

    it("Should return an error 500 if breed already exists.", () => {
      return new Promise(async (resolve, reject) => {
        await agent
          .post("/breeds")
          .send({ ...breed, name: "another test", temperaments: ["temperamentName"] })
          .expect(200);
        await agent
          .post("/breeds")
          .send({ ...breed, name: "another test", temperaments: ["temperamentName"] })
          .expect(500)
          .then(resolve)
          .catch(reject);
      });
    });
  });

  after(() => {
    Breed.sync({ force: true });
    Temperament.sync({ force: true });
  });
});
