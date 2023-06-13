import {createSurvey,getQuestions, getSurveys} from '../controllers/surveyfeedbackController.js'
const surveyfeedbackRoutes = (app) =>{
    app.route("/surveyfeedback")
        .get(getSurveys)
        .post(createSurvey);
       
    app.route("/surveyfeedback/:Id")
        .get(getQuestions)
        .put()
        .delete();
};
export default surveyfeedbackRoutes 