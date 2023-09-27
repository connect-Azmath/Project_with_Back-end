const express = require("express")
const dotenv = require("dotenv");

// const dbCon = require("dbConnection");

dotenv.config();

console.log("Started . . . . . ")

//Import Routes
const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");
const dbConnection = require("./databaseConnection.js");
// const rout = require("./")

const app = express();

dbConnection();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up & Running..."
    });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);


app.get("*",(req, res)=>{
    res.status(404).json({
        message: "This route doesn't exist",
    });
})
    
    app.listen(port, () => {
        console.log(`Server is Listning at port ${port}`);
    });
// })

// dbConnection();