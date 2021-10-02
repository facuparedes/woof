const router = require("express").Router();

router.use("/dogs", require("./dogs")).use("/temperament", require("./temperament"));

module.exports = router;
