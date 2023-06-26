import {createSurvey,getSurveys,deleteSurvey,getResponse} from '../controllers/surveyfeedbackController.js'
import {register,login,loginRequired} from '../controllers/authController.js'
import {submitResponse,getSurvey} from '../controllers/responseController.js'
import { GetProfile, UpdateProfile } from '../controllers/profileController.js';
import { sendFeedback } from '../controllers/feedBackController.js';




const surveyfeedbackRoutes = (app) =>{
    app.route("/surveyfeedbacks")
        .post(loginRequired,createSurvey)
        .get(loginRequired,getSurveys);
       
    app.route("/surveyfeedback/:id")
        .delete(loginRequired,deleteSurvey);

    app.route("/response/:questionId")
        .get(loginRequired,getResponse);
    
    app.route("/questions")
        .post(loginRequired,submitResponse)
        .get(loginRequired,getSurvey);

    app.route("/feedback")
        .post(loginRequired,sendFeedback)

    app.route('/auth/register')
        .post(register);
    

    app.route('/auth/login')
        .post(login);

    app.route('/profile')
        .post(loginRequired,UpdateProfile)
        .get(loginRequired,GetProfile)
};
export default surveyfeedbackRoutes 