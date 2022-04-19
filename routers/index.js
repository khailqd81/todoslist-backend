const express = require("express")
const router = express.Router();
const taskRoute = require("./taskRoute");
const accountRoute = require("./accountRoute");
const authJwt = require("../utils/authJwt");
router.use("/task", authJwt.isSignIn, taskRoute);
router.use("/account", accountRoute);

module.exports = router