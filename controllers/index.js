const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeroutes");
const dashboardRoutes 
// establish routes ... does this order matter
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
