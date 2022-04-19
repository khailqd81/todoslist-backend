const express = require("express")
const router = express.Router();
const accountController = require("../controllers/accountController");
const authJwt = require("../utils/authJwt");
router.post("/signin", accountController.signin);
router.post("/signup", accountController.signup);
router.get("/info",authJwt.isSignIn, accountController.getAccountById);
router.get("/is-signin", authJwt.isSignIn, function (req, res, next) {
    return res.status(200).send({
        message: "login true",
        account_id: req.userId
    })
});

module.exports = router