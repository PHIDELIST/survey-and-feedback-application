import {createSurvey,getSurveys,deleteSurvey,getResponse} from '../controllers/surveyfeedbackController.js'
import {register,login,loginRequired} from '../controllers/authController.js'
import {submitResponse,getSurvey} from '../controllers/responseController.js'
import { GetProfile, UpdateProfile } from '../controllers/profileController.js';
import { sendFeedback,submitSurveyResponse } from '../controllers/feedBackController.js';
import { UpdateProfilePhoto } from '../functions/updateprofile.js';
import {getResponseStatistics} from '../controllers/statisticsController.js'
import multer from "multer";

const upload = multer({ dest: "uploads/" });
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
        .get(getSurvey);

    app.route("/feedback")
        .post(loginRequired,sendFeedback)

    app.route("/surveyresponse")
        .post(loginRequired,submitSurveyResponse)
     
    

    app.route("/statistics")
        .get(getResponseStatistics)


    app.route('/auth/register')
        .post(register);
    
    app.route('/auth/login')
        .post(login);

    app.route('/profile')
        .post(loginRequired,UpdateProfile)
        .get(loginRequired,GetProfile)
    app.route("/upload-profile-picture")
        .post(upload.single("file"),UpdateProfilePhoto);

};
export default surveyfeedbackRoutes 