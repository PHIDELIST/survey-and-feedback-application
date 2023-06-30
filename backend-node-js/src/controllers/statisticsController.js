import sql from 'mssql';
import config from '../db/config.js';

export const getResponseCountBySurvey = async (req, res) => {
  const AdminID = req.admin.AdminID    
    try {
      let pool = await sql.connect(config.sql);
      const result = await pool.request().query(`
        SELECT S.SurveyID, S.Title, COUNT(*) AS ResponseCount
        FROM SurveyResponses AS SR
        JOIN Surveys AS S ON SR.SurveyID = S.SurveyID
        WHERE S.AdminID = ${AdminID}
        GROUP BY S.SurveyID, S.Title
      `);
  
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving response counts.' });
    }
  };