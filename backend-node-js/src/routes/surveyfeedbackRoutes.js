import {createSurvey,getQuestions, getSurveys,deleteSurvey,getResponse} from '../controllers/surveyfeedbackController.js'
import {register,login,loginRequired} from '../controllers/authController.js'
import { response } from 'express';
import { createLocations } from '../controllers/locationController.js';

const surveyfeedbackRoutes = (app) =>{
    app.route("/surveyfeedbacks")
        .get(loginRequired,getSurveys)
        .post(createSurvey);
       
    app.route("/surveyfeedback/:surveyId")
        .get(loginRequired,getQuestions)
        .delete(loginRequired,deleteSurvey);

    app.route("/response/:questionId")
        .get(loginRequired,getResponse);

    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);

    app.route('/locations')
        .post(createLocations)


};
export default surveyfeedbackRoutes 