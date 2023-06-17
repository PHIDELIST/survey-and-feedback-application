// here is where we write the logic
import sql from 'mssql';
import config from '../db/config.js';

//get all surveys
export const getSurveys = async (req,res) => {
    try{
        let pool = await sql.connect(config.sql);//configurations for connectiong to sql
        const result = await pool.request().query("SELECT * FROM Surveys");// ALL the queries are writen here(*)
        res.status(200).json(result.recordset[0]);
    
    }catch(error){
        res.status(202).json({error: 'an error occurred while retrieving surveys'});
    }finally{
        sql.close();
    }
};

//Creating a Survey
export const createSurvey = async (req,res) => {
    try{
        const{title,description,startDate,endDate,active,adminId} = req.body;
        let pool = await sql.connect(config.sql);//configurations for connectiong to sql
        await pool.request()
        .input('title',sql.VarChar,title)//these .inputs helps to prevent sql injection attacts by confiming first the data types then holding them to be used later
        .input('description',sql.VarChar,description)
        .input('startDate',sql.Date,startDate)
        .input('endDate',sql.Date,endDate)
        .input('active',sql.Bit,active)
        .input('adminId',sql.Int,adminId)
        .query("INSERT INTO Surveys (title,description,startDate,endDate,active,adminId) VALUES (@title,@description,@startDate,@endDate,@active,@adminId)");
        res.status(200).json({message: 'survey created successfully'})
    }catch(error){
        res.status(500).json({error: 'an error occurred while creating a survey'}); 
    }finally{
        sql.close();
    }
}
//Creating a Survey questions
export const createQuestions = async (req,res) => {
    try{
        const{surveyId,questionText} = req.body;
        let pool = await sql.connect(config.sql);//configurations for connectiong to sql
        await pool.request()
        .input('surveyId',sql.Int,surveyId)
        .input('questionText',sql.VarChar,questionText)
        .query("INSERT INTO Questions (surveyId,questionText) VALUES (@surveyId,@questionText)");
        res.status(200).json({message: 'question created successfully'})
    }catch(error){
        res.status(500).json({error: 'an error occurred while creating a question'}); 
    }finally{
        sql.close();
    }
}
///Fetching questions for a specific survey
export const getQuestions = async (req,res) => {
    try{
        const{surveyId} = req.params;
        let pool = await sql.connect(config.sql);//configurations for connectiong to sql
        const result = await pool.request()
        .input('surveyId',sql.Int,surveyId)
        .query("SELECT * FROM Questions WHERE surveyId = @surveyId");
        res.status(200).json(result.recordset);
    }catch(error){
        res.status(500).json({error: 'an error occurred while retrieving questions'}); 
    }finally{
        sql.close();
    }
}
//DELETING a Survey

export const deleteSurvey = async (req,res) => {
    try{
        const{surveyId} = req.params;
        let pool = await sql.connect(config.sql);//configurations for connectiong to sql
        await pool.request()
        .input('surveyId',sql.Int,surveyId)
        .query("DELETE FROM Surveys WHERE surveyId = @surveyId");
        res.status(200).json({message: 'survey deleted successfully'})
    }catch(error){
        res.status(500).json({error: 'an error occurred while deleting a survey'}); 
    }finally{
        sql.close();
    }

}
//GET a response for a specific question

export const getResponse = async (req,res) => {
    try{
        const{questionId} = req.params;
        let pool = await sql.connect(config.sql);//configurations for connectiong to sql
        const result = await pool.request()
        .input('questionId',sql.Int,questionId)
        .query("SELECT * FROM Responses WHERE questionId = @questionId");
        res.status(200).json(result.recordset);
    }catch(error){
        res.status(500).json({error: 'an error occurred while retrieving responses'}); 
    }finally{
        sql.close();
    }
}