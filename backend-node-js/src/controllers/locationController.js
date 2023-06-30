import sql from 'mssql';
import config from '../db/config.js';

export const createLocations = async (req, res) => {
    const{Country,City} = req.body;
    try {
        const pool = await sql.connect(config.sql);
        await pool.request()
        .input('Country', sql.VarChar, Country)
        .input('City', sql.VarChar, City)
        .query("INSERT INTO Locations (Country, City) VALUES (@Country, @City)");
    res.status(201).json({message:"Location created successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }finally{
        sql.close();
    }
}

