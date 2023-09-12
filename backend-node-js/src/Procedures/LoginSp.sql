CREATE or ALTER PROCEDURE sp_Login
    @Email VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
        SELECT * FROM Admins WHERE Email = @Email
END;
