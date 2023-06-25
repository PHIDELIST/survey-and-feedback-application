import sql from 'mssql';
import config from '../db/config.js';

export const submitResponse = async (req, res) => {
    const surveyResponse = req.body;
      try {
      await sql.connect(config.sql);
        // Insert the survey response into the database
      const query = `
        INSERT INTO SurveyResponses (SurveyID, QuestionID, Answer)
        VALUES (@surveyID, @questionID, @answer)
      `;
  
      const transaction = new sql.Transaction();
      transaction.begin(async (error) => {
        if (error) {
          console.log('Transaction error:', error);
          res.status(500).send('Database error.');
          return;
        }
  
        try {
          const ps = new sql.PreparedStatement(transaction);
          ps.input('surveyID', sql.Int);
          ps.input('questionID', sql.Int);
          ps.input('answer', sql.VarChar);
  
          for (const question of surveyResponse.survey) {
            await ps.prepare(query);
  
            for (const choice of question.choices) {
              await ps.execute({
                surveyID: 1, // Replace with the actual survey ID
                questionID: 1, // Replace with the actual question ID
                answer: choice,
              });
            }
  
            await ps.unprepare();
          }
  
          await transaction.commit();
          res.status(200).json({ message: 'Survey response submitted successfully.' });
        } catch (error) {
          await transaction.rollback();
          console.log('Transaction rollback:', error);
          res.status(500).send('Database error.');
        }
      });
    } catch (error) {
      console.log('Database connection error:', error);
      res.status(500).send('Database error.');
    } finally {
      sql.close();
    }
  }
  ;
  
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
  
  