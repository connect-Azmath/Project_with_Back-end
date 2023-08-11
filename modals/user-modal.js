const mongoose = require("mongoose");

const schema = mongoose.schema;

const userSchema = new schema(
    {
        name:{
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.modal("User", userSchema)