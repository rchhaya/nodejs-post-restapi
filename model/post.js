const mongoose = require("mongoose")
const post = new mongoose.Schema({
    title : {
        required: true,
        type: String
    }, 
    description: {
        required: true,
        type: String
    }

});

module.exports = mongoose.model("posts", post)