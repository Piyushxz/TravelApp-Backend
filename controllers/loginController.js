const User = require("../model/user.model");
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken"); 
const loginHandler = async (req, res) => {
    try {
        const user = await User.findOne({ number: req.body.number });
        if (!user) {
            return res.status(401).json({ message: "Invalid Mobile Number" });
        }

        const decodedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if (decodedPassword !== req.body.password) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const { password, ...rest } = user._doc;
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN); // Use correct token secret
        console.log(accessToken)
        res.json({ ...rest, accessToken }); // Send both user data and accessToken
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = loginHandler