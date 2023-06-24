import sql from 'mssql';
import config from '../db/config.js';

export const submitResponse = async (req, res) => {
    try {
      const { surveyId, formData } = req.body;
  
    
      const pool = await sql.connect(config.sql);
      const surveyResponseQuery = `INSERT INTO SurveyResponses (SurveyID, UserID, QuestionID, OptionID, ResponseText, Timestamp)
                                   VALUES (@surveyId, @userId, @questionId, @optionId, @responseText, GETDATE())`;
  
      for (const questionId in formData) {
        const response = formData[questionId];
        if (Array.isArray(response)) {
          
          for (const optionId of response) {
            await pool.request()
              .input('surveyId', sql.Int, surveyId)
              .input('userId', sql.Int, userId)
              .input('questionId', sql.Int, questionId)
              .input('optionId', sql.Int, optionId)
              .input('responseText', sql.NVarChar, null)
              .query(surveyResponseQuery);
          }
        } else {
          
          await pool.request()
            .input('surveyId', sql.Int, surveyId)
            .input('userId', sql.Int, userId)
            .input('questionId', sql.Int, questionId)
            .input('optionId', sql.Int, null)
            .input('responseText', sql.NVarChar, response)
            .query(surveyResponseQuery);
        }
      }
  
      
      res.status(200).json({ message: 'Survey response submitted successfully' });
    } catch (error) {
      console.error('Error submitting survey response:', error);
      res.status(500).json({ error: 'An error occurred while submitting the survey response' });
    } finally {
      sql.close();
    }
  };
  
  
  export const getSurvey = async (req, res) => {
    try {
      await sql.connect(config.sql);
  
      const query = `
        SELECT
          s.Title,
          s.Description,
          q.QuestionText AS 'text',
          q.Type AS 'type',
          (
            SELECT OptionText FROM Options WHERE QuestionID = q.QuestionID FOR JSON PATH
          ) AS 'choices'
        FROM Surveys s
        JOIN Questions q ON q.SurveyID = s.SurveyID
        FOR JSON PATH, ROOT('survey')
      `;
  
      const result = await sql.query(query);
  
      if (result.recordset.length === 0) {
        res.status(404).json({ message: 'No surveys found' });
        return;
      }
  
      const surveyData = JSON.parse(result.recordset[0][Object.keys(result.recordset[0])[0]]);
  
      res.json(surveyData);
    } catch (err) {
      console.log(err);
      res.status(500).send('Database error.');
    } finally {
      sql.close();
    }
  };
  
  