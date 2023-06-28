import sql from 'mssql';
import config from '../db/config.js';

export const getResponsePerSurvey = async (req, res) => {
  const { surveyID } = req.params;

  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query(`
      SELECT *
      FROM SurveyResponses
      WHERE SurveyID = ${surveyID}
     
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'No responses available' });
    }

    res.status(200).json(result.recordset);
  } catch (error) {
    
    res.status(500).json({ error: 'An error occurred while retrieving survey responses.' });
  } finally {
    sql.close();
  }
};
