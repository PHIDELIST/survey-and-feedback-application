CREATE PROCEDURE sp_SendFeedback
    @FeedbackType NVARCHAR(255),
    @FeedbackText NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO Feedback (FeedbackType, FeedbackText)
        VALUES (@FeedbackType, @FeedbackText);
        SELECT 'Feedback submitted successfully' AS Result;
    END TRY
    BEGIN CATCH
        SELECT 'Error submitting feedback' AS Result;
    END CATCH
END;
