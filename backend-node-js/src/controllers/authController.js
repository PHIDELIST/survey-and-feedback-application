import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { firstName, lastName, country, email,phoneNumber,registrationDate, password,organizationId } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const pool = await sql.connect(config.sql);
        await pool.request()
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('country', sql.VarChar, country)
            .input('email', sql.VarChar, email)
            .input('phoneNumber', sql.VarChar, phoneNumber)
            .input('registrationDate', sql.Date, registrationDate)
            .input('password', sql.VarChar, hashedPassword)
            .input('organizationId', sql.Int, organizationId)
            .query('INSERT INTO Admins (firstName, lastName, country, email,phoneNumber,registrationDate, password,organizationId) VALUES (@firstName, @lastName, @country, @email,@phoneNumber,@registrationDate, @password,@organizationId)')
        res.status(200).json({ message: 'Admin created successfully' });
    }catch(error){
        res.status(500).json({ message: error.message });
    }finally{
        sql.close();
    }
}
export const login = async (req, res) => {
    res.send('login');
}