import {createSurvey,getSurveys,deleteSurvey,getResponse} from '../controllers/surveyfeedbackController.js'
import {register,login,loginRequired} from '../controllers/authController.js'
import {submitResponse,getSurvey} from '../controllers/responseController.js'
import { GetProfile, UpdateProfile } from '../controllers/profileController.js';
import { sendFeedback,submitSurveyResponse } from '../controllers/feedBackController.js';
import {getResponseCountBySurvey} from '../controllers/statisticsController.js'
import {getResponsePerSurvey} from '../controllers/surveyResponseController.js'
import {AvatarUpload,upload,AvatarDelete} from '../functions/avatarController.js'

//for s3 upload
//import multer from "multer";
//import { UpdateProfilePhoto } from '../functions/updateprofile.js';
// const upload = multer({ dest: "uploads/" });




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
        .get(loginRequired,getResponseCountBySurvey)

    app.route("/statistics/:surveyID")
        .get(loginRequired,getResponsePerSurvey)

    app.route('/auth/register')
        .post(register);
    
    app.route('/auth/login')
        .post(login);

    app.route('/profile')
        .post(loginRequired,UpdateProfile)
        .get(loginRequired,GetProfile)
        //for s3 upload
    // app.route("/upload-profile-picture")
    //     .post(upload.single("file"),UpdateProfilePhoto);

    app.route("/deleteProfileAvatar")
        .post(loginRequired,AvatarDelete)

    app.route("/updateProfileAvatar")
        .post(loginRequired,upload.single("profile_image"),AvatarUpload)


};
export default surveyfeedbackRoutes 