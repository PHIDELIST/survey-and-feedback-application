import {createSurvey,getQuestions, getSurveys,deleteSurvey,getResponse} from '../controllers/surveyfeedbackController.js'
import {register,login,loginRequired} from '../controllers/authController.js'
import {submitResponse} from '../controllers/responseController.js'


const surveyfeedbackRoutes = (app) =>{
    app.route("/surveyfeedbacks")
        .get(loginRequired,getSurveys)
        .post(loginRequired,createSurvey);
       
    app.route("/surveyfeedback/:surveyId")
        .get(loginRequired,getQuestions)
        .delete(loginRequired,deleteSurvey);

    app.route("/response/:questionId")
        .get(loginRequired,getResponse);
    
    app.route("/response")
        .post(loginRequired,submitResponse);

    app.route('/auth/register')
        .post(register);
    

    app.route('/auth/login')
        .post(login);

};
export default surveyfeedbackRoutes 