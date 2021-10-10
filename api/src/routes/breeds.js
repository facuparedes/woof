const router = require("express").Router();
const { DogService } = require("../services");

router
  .get("/", (req, res, next) => {
    const { name } = req.query;
    if (name !== undefined && !name) return next({ status: 400, message: "name is required" });

    const selectedGetBreeds = name ? DogService.getBreedByName(name) : DogService.getAllBreeds();
    selectedGetBreeds.then((parsedData) => res.json(parsedData)).catch((err) => next(err));
  })
  .post("/", (req, res, next) => {
    const { name, height, weight, life_span, temperaments } = req.body;
    if (!name || !height || !weight || !life_span || !temperaments) return next({ status: 400, message: "name, height, weight, life_span, temperaments are required" });

    DogService.createBreed(name, height, weight, life_span, temperaments)
      .then((parsedData) => res.json(parsedData))
      .catch((err) => next(err));
  })
  .get("/:id", (req, res, next) => {
    const { id } = req.params;

    if (id === "randoms") {
      return DogService.getRandomBreeds()
        .then((parsedData) => res.json(parsedData))
        .catch((err) => next(err));
    }

    DogService.getBreedById(id)
      .then((parsedData) => res.json(parsedData))
      .catch((err) => next(err));
  });

module.exports = router;
