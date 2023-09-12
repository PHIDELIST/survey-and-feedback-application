CREATE PROCEDURE sp_SendFeedback
    @FeedbackType NVARCHAR(255),
    @FeedbackText NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Insert feedback into the Feedback table
        INSERT INTO Feedback (FeedbackType, FeedbackText)
        VALUES (@FeedbackType, @FeedbackText);
        
        -- Return a success message
        SELECT 'Feedback submitted successfully' AS Result;
    END TRY
    BEGIN CATCH
        -- Return an error message if an exception occurs
        SELECT 'Error submitting feedback' AS Result;
    END CATCH
END;
