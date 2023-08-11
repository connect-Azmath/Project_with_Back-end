const mongoose = require("mongoose");

const schema = mongoose.schema;

const bookSchema = new schema({
    name:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    publsher: {
        type: String,
        required: true,
    },
},
{
    timestamps: true
} 
);

// collections / tables
 module.exports = mongoose.modal("Book", bookSchema);