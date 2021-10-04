const router = require("express").Router();
const { DogService } = require("../services");

router.get("/", (_, res, next) => {
  DogService.getAllTemperaments()
    .then((temperaments) => res.json(temperaments))
    .catch((err) => next(err));
});

module.exports = router;
