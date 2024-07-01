const express = require('express');
const router = express.Router();

const signupHandler = require("../controllers/signupController")
router.route("/register")
    .post(signupHandler);

const loginHandler = require("../controllers/loginController")
router.route("/login")
    .post(loginHandler);

module.exports = router;
