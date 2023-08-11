const mongoose = require("mongoose");


function dbConnection() {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL, {
        // useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", console.log.bind(console, "Error in the Connection"))
    db.once("open", function(){
        console.log("DB connection successully done")
    })
}

module.exports = dbConnection;