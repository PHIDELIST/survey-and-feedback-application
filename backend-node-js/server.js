import express from "express";
import config from './src/db/config.js';
import surveyfeedbackRoutes from "./src/routes/surveyfeedbackRoutes.js"
import Rollbar from 'rollbar';
import jwt from 'jsonwebtoken';




const app = express();

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    code_version: '1.0.0',
  },
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
  jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function(err, decode){
    if(err) req.admin = undefined;
    // rollbar.info('JWT token found');
    req.admin = decode;
    next();
  });
}else{
  req.admin = undefined;
  next();
}
}
);
// Error handling middleware
app.use(rollbar.errorHandler());



//ROUTES
surveyfeedbackRoutes(app);
app.get("/", (req, res) => {
    res.send("Hello World!");

});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.url}`);
});