import express from "express";
import config from './db/config.js';
import surveyfeedbackRoutes from "./routes/surveyfeedbackRoutes.js"
import bodyParser from "body-parser";

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

surveyfeedbackRoutes(app);


app.get("/", (req, res) => {
    res.send("Hello World!");

});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.url}`);
});