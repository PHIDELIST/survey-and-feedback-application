import express from "express";
import config from './src/db/config.js';
import surveyfeedbackRoutes from "./src/routes/surveyfeedbackRoutes.js"


const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//ROUTES
surveyfeedbackRoutes(app);
app.get("/", (req, res) => {
    res.send("Hello World!");

});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.url}`);
});