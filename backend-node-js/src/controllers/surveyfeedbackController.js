import sql from 'mssql';
import config from '../db/config.js';

// Creating a Survey
export const createSurvey = async (req, res) => {
  try {
    const { Title, Description, StartDate, EndDate, Active, Questions } = req.body;
    const AdminID = req.admin.AdminID; // getting stored admin's ID in the user object after authentication
    let pool = await sql.connect(config.sql);

    const transaction = new sql.Transaction(pool);

    // Wrap transaction.begin with a promise
    const beginTransaction = () => {
      return new Promise((resolve, reject) => {
        transaction.begin((error) => {
          if (error) {
            console.error('Transaction begin error:', error);
            reject(error);
          } else {
            resolve();
          }
        });
      });
    };

    // Call beginTransaction and handle errors
    try {
      await beginTransaction();

      const request = new sql.Request(transaction);

      // Insert survey data
      request.input('Title', sql.VarChar, Title);
      request.input('Description', sql.VarChar, Description);
      request.input('StartDate', sql.Date, StartDate);
      request.input('EndDate', sql.Date, EndDate);
      request.input('Active', sql.Bit, Active);
      request.input('AdminID', sql.Int, AdminID);
      const surveyInsertQuery =
        'INSERT INTO Surveys (Title, Description, StartDate, EndDate, Active, AdminID) ' +
        'VALUES (@Title, @Description, @StartDate, @EndDate, @Active, @AdminID); ' +
        'SELECT SCOPE_IDENTITY() AS SurveyID';

        const surveyIdResult = await request.query(surveyInsertQuery);
        const surveyId = surveyIdResult.recordset[0].SurveyID;


      // Insert questions
      for (let i = 0; i < Questions.length; i++) {
        const question = Questions[i];
        request.input(`QuestionText_${i}`, sql.Text, question.text);
        request.input(`Type_${i}`, sql.VarChar, question.type);
        request.input(`SurveyID_${i}`, sql.Int, surveyId);

        const questionInsertQuery =
          `INSERT INTO Questions (QuestionText, Type, SurveyID) ` +
          `VALUES (@QuestionText_${i}, @Type_${i}, ${surveyId}); SELECT SCOPE_IDENTITY() AS QuestionID`;

        const questionInsertResult = await request.query(questionInsertQuery);
        const questionId = questionInsertResult.recordset[0].QuestionID;

        // Insert question options
        if (question.options && question.options.length > 0) {
          for (let j = 0; j < question.options.length; j++) {
            const option = question.options[j];
            request.input(`OptionText_${i}_${j}`, sql.Text, option);
            request.input(`QuestionID_${i}_${j}`, sql.Int, questionId);

            const optionInsertQuery =
              `INSERT INTO Options (OptionText, QuestionID) ` +
              `VALUES (@OptionText_${i}_${j}, @QuestionID_${i}_${j})`;

            await request.query(optionInsertQuery);
          }
        }
      }

      // Commit the transaction
      transaction.commit((commitError) => {
        if (commitError) {
          console.error('Transaction commit error:', commitError);
          res.status(500).json({ error: 'An error occurred while creating a survey' });
        } else {
          res.status(200).json({ message: 'Survey created successfully' });
        }
      });
    } catch (error) {
      console.error('Database operation error:', error);
      // Rollback the transaction in case of any query error
      transaction.rollback((rollbackError) => {
        if (rollbackError) {
          console.error('Transaction rollback error:', rollbackError);
        }
        res.status(500).json({ error: 'An error occurred while creating a survey' });
      });
    }
  } catch (connectionError) {
    console.error('Database connection error:', connectionError);
    res.status(500).json({ error: 'An error occurred while connecting to the database' });
  } finally {
    sql.close();
  }
};


//get all surveys for specific admin
export const getSurveys = async (req, res) => {
  try {
   
    const AdminID = req.admin.AdminID;

    let pool = await sql.connect(config.sql); 
    const result = await pool
      .request()
      .input('AdminID', sql.Int, AdminID)
      .query('SELECT * FROM Surveys WHERE AdminID = @adminID');

    res.status(200).json(result.recordset); // Return the surveys created by the admin

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving surveys' });
  } finally {
    sql.close();
  }
};


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

export const deleteSurvey = async (req, res) => {
  try {
    const { id } = req.params; 
    let pool = await sql.connect(config.sql); 
    const result = await pool.request()
      .input('SurveyID', sql.Int, id) 
      .query("DELETE FROM Surveys WHERE SurveyID = @SurveyID"); 
    if (result.rowsAffected[0]) {
      res.status(200).json({ message: 'survey deleted successfully' });
    } else {
      res.status(404).json({ message: 'No survey found with the given id' });
    }
  } catch (error) {
    res.status(500).json({ error: 'an error occurred while deleting a survey' });
  } finally {
    sql.close();
  }
};

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