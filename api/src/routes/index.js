const router = require("express").Router();

router.use("/breeds", require("./breeds")).use("/temperaments", require("./temperaments"));

module.exports = router;
