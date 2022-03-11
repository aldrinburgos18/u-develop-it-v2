const router = require("express").Router();

router.use(require("./candidateRoutes"));
router.use(require("./partyRoutes"));

module.exports = router;
