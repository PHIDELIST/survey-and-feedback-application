// here is where we write the logic
import sql from 'mssql';
import config from '../db/config.js';

//get all surveys
export const getSurveys = async (req,res) => {
    try{
        let pool = await sql.connect(config.sql);//configurations for connectiong to sql
        const result = await pool.request().query("SELECT * FROM Surveys");// ALL the queries are writen here(*)
        res.send(result);
    
    }catch(error){
        res.status(202).json({error: 'an error occurred while retrieving surveys'});
    }finally{
        sql.close();
    }
};

//