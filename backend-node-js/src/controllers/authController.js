import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
    if (req.admin) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }

}



export const register = async (req, res) => {
    const {AdminName,Password,Email } = req.body;
    const hashedPassword = bcrypt.hashSync(Password, 10);
    try {
        const admin= await sql.connect(config.sql);
        const result = await admin.request()
            .input('Email', sql.VarChar, Email)
            .query('SELECT * FROM Admins WHERE Email = @Email');
            const user = result.recordset[0];
            if(user){
                res.status(400).json({ message: 'User already exists' });
            }else{
        await admin.request()
            .input('AdminName', sql.VarChar, AdminName)
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, hashedPassword)
            .query('INSERT INTO Admins (AdminName,Email,Password) VALUES (@AdminName,@Email,@Password)')
        res.status(200).json({ message: 'User created successfully' });
    }}catch(error){
        res.status(500).json({ message: error.message });
    }finally{
        sql.close();
    }
}
export const login = async (req, res) => {
    let { Email, Password } = req.body;
    let pool= await sql.connect(config.sql);
    const result = await pool.request()
        .input('Email', sql.VarChar, Email)
        .query('SELECT * FROM Admins WHERE Email = @Email');
    const admin = result.recordset[0];
    if(!admin){
        res.status(400).json({ message: 'User does not exist' });
    }else{
        if(!bcrypt.compareSync(Password, admin.Password)){
            res.status(400).json({ message: 'Password is incorrect' });
        }else {
            const token = `JWT ${jwt.sign({ AdminID: admin.AdminID, AdminName: admin.AdminName, Email: admin.Email}, config.jwt_secret)}`;
            res.status(200).json({AdminID: admin.AdminID, Email: admin.Email, token:token });
        
        }
    
}
};