import config from "../db/config.js";
import sql from "mssql";


export const UpdateProfile = async (req,res) => {
    try {
        const {Country,City,OrganizationType,OrganizationName} = req.body;
        const AdminID = req.admin.AdminID;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('AdminID', sql.Int, AdminID)
        .input('Country', sql.VarChar, Country)
        .input('City', sql.VarChar, City)
        .input('OrganizationType', sql.VarChar, OrganizationType)
        .input('OrganizationName', sql.VarChar, OrganizationName)
        .query('UPDATE Admins SET Country = @Country, City = @City, OrganizationType = @OrganizationType, OrganizationName = @OrganizationName WHERE AdminID = @AdminID');
        res.status(200).json({message: "Profile Updated Successfully"});
    }catch(error) {
        res.status(500).json({message: error.message});
    }finally{
        sql.close();
    }
}

export const GetProfile = async (req,res) => {
    try {
        const AdminID = req.admin.AdminID;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
        .input('AdminID', sql.Int, AdminID)
        .query('SELECT Country, City, OrganizationType, OrganizationName FROM Admins WHERE AdminID = @AdminID');
        res.status(200).json(result.recordset[0]);

    }catch(error){
        res.status(500).json({message: error.message});
    
}finally{
    sql.close();
}}