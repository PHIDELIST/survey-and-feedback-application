import {createSurvey,getQuestions, getSurveys} from '../controllers/surveyfeedbackController.js'
import {register,login} from '../controllers/authController.js'

const surveyfeedbackRoutes = (app) =>{
    app.route("/surveyfeedback")
        .get(getSurveys)
        .post(createSurvey);
       
    app.route("/surveyfeedback/:Id")
        .get(getQuestions)
        .put()
        .delete();
        
    app.route('/auth/register')
    .post(register);

    app.route('/auth/login')
    .post(login);

};
export default surveyfeedbackRoutes 