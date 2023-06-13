import express from "express";
import config from './db/config.js';
import surveyfeedbackRoutes from "./routes/surveyfeedbackRoutes.js"

const app = express();
surveyfeedbackRoutes(app);

app.get("/", (req, res) => {
    res.send("Hello World!");

});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.url}`);
});