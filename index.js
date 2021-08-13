const express = require("express"); //includes bodyparser
const app = express(); 
const mongoose = require("mongoose") //for database connectivity
const dotEnv = require("dotenv"); //To hide connection string + port number from others

dotEnv.config();

//Parsing body 
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

app.get("/", (request, response) => { //Request is what you get, response is what you send
    response.send("Server is up"); //Display text
});

mongoose
    .connect(process.env.DATABASE_URL, 
    {
        useNewUrlParser: true, //Gives us warning if we don't use these 2 use options
        useUnifiedTopology: true
    }
    )
    .then(() => {
        console.log("Connected to actual database")
    })
    .catch((err) => {
        console.log(err);
    })


app.use("/posts", require("./routes/posts"));
app.listen(process.env.PORT, () => {
    console.log("Connected to mongo DB")
})