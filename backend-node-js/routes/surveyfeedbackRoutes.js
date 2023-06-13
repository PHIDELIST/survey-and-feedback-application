import {getSurveys} from '../controllers/surveyfeedbackController.js'
const surveyfeedbackRoutes = (app) =>{
    app.route("/surveyfeedback")
        .get(getSurveys)
        .post();
    app.route("/surveyfeedback/:Id")
        .get()
        .put()
        .delete()
};
export default surveyfeedbackRoutes 