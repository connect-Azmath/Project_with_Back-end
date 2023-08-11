const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        // message: "Get User information",
        success: true,
        data: users 
    });
});


module.exports = router;