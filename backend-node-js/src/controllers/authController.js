import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.admin) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }

}

export const register = async (req, res) => {
    const { firstName, lastName, country, email,phoneNumber,registrationDate, password,organizationId } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const adminReg = await sql.connect(config.sql);
        const result = await adminReg.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Admins WHERE email = @email');
            const user = result.recordset[0];
            if(user){
                res.status(400).json({ message: 'Admin already exists' });
            }else{
        await adminReg.request()
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
    }}catch(error){
        res.status(500).json({ message: error.message });
    }finally{
        sql.close();
    }
}
export const login = async (req, res) => {
    let { email, password } = req.body;
    let pool= await sql.connect(config.sql);
    const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM Admins WHERE email = @email');
    const admin = result.recordset[0];
    if(!admin){
        res.status(400).json({ message: 'Admin does not exist' });
    }else{
        if(!bcrypt.compareSync(password, admin.password)){
            res.status(400).json({ message: 'Password is incorrect' });
        }else {
            const token = `JWT ${jwt.sign({ firstName: admin.firstName, email: admin.email}, config.jwt_secret, { expiresIn: '1h' })}`;
            res.status(200).json({ email: admin.email, token:token });
        
        }
    
}
};