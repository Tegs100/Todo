const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.config");
dotenv.config();

const PORT = process.env.PORT;



connectDB ()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed", err);
        process.exit(1); 
    });