import {createSurvey,getQuestions, getSurveys} from '../controllers/surveyfeedbackController.js'
import {register,login,loginRequired} from '../controllers/authController.js'

const surveyfeedbackRoutes = (app) =>{
    app.route("/surveyfeedback")
        .get(loginRequired,getSurveys)
        .post(createSurvey);
       
    app.route("/surveyfeedback/:Id")
        .get(loginRequired,getQuestions)
        .put()
        .delete();
        
    app.route('/auth/register')
    .post(register);

    app.route('/auth/login')
    .post(login);

};
export default surveyfeedbackRoutes 