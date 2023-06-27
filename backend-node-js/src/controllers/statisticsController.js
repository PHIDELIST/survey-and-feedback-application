import sql from 'mssql';
import config from '../db/config.js'

export const getResponseStatistics = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .query(`
      SELECT
      COUNT(*) AS ResponseCount,
      CASE
        WHEN answerValue = (SELECT MIN(answerValue) FROM SurveyResponses WHERE answerValue IS NOT NULL) THEN 'Min'
        WHEN answerValue = (SELECT MAX(answerValue) FROM SurveyResponses WHERE answerValue IS NOT NULL) THEN 'Max'
        ELSE ''
      END AS MinMaxIndicator,
      answerValue AS ResponseValue
    FROM SurveyResponses
    WHERE answerValue IS NOT NULL
    GROUP BY answerValue;

      `);
      const responseValue = JSON.parse(result.recordset[0].ResponseValue);
      console.log(responseValue);
      
  } catch (error) {
    console.error('Error retrieving response statistics:', error);
    res.status(500).json({ error: 'An error occurred while retrieving response statistics' });
  }
  finally {
    sql.close();
  }
};
