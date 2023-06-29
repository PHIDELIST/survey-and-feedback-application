import sql from 'mssql';
import config from '../db/config.js';
import multer from 'multer';
import path from 'path';


export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const AdminID = req.admin.AdminID;
    const profileImageName = `${AdminID}${path.extname(file.originalname)}`;
    cb(null, profileImageName);
  },
});

export const upload = multer({ storage }); 


export const AvatarUpload = async (req, res) => {
  try {
    upload.single('profile_image')(req, res, async (err) => {
      
      const AdminID = req.admin.AdminID;
      const profileImageName = `${AdminID}`;

      let pool = await sql.connect(config.sql);
      await pool
        .request()
        .input('AdminID', sql.Int, AdminID)
        .input('ProfileAvatar', sql.VarChar, profileImageName)
        .query('UPDATE Admins SET ProfileAvatar = @ProfileAvatar WHERE AdminID = @AdminID');

      res.status(201).json({ message: 'Profile picture updated successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};



export const AvatarDelete = async (req, res) => {
  try {
    const { AdminID } = req.body;

    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("AdminID", sql.Int, AdminID)
      .query("SELECT ProfileAvatar FROM Admins WHERE AdminID = @AdminID");

    const profileImageName = result.recordset[0].ProfileAvatar;

    await pool
      .request()
      .input("AdminID", sql.Int, AdminID)
      .query("UPDATE Admins SET ProfileAvatar = NULL WHERE AdminID = @AdminID");

    if (profileImageName) {
      const imagePath = `images/${profileImageName}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(201).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
};

