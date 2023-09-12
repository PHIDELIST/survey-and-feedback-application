CREATE or ALTER PROCEDURE sp_InsertAdmin
    @AdminName VARCHAR(255),
    @Email VARCHAR(255),
    @Password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM Admins WHERE Email = @Email)
    BEGIN
        INSERT INTO Admins (AdminName, Email, Password)
        VALUES (@AdminName, @Email, @Password);

        SELECT 'User created successfully' AS Message;
    END
    ELSE
    BEGIN
        SELECT 'User already exists' AS Message;
    END
END;
