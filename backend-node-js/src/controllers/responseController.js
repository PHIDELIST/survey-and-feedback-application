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
  
  export const getCustomSurveys = async (req, res) => {
    try {
      await sql.connect(config.sql);
      const result = await sql.query(`
      SELECT q.id AS questionId, q.question, c.id AS choiceId, c.choice
      FROM CustomQuestions q
      JOIN Choices c ON q.id = c.questionId;
    `);
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } finally {
      sql.close();
    }
  };
