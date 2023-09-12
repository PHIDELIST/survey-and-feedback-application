CREATE OR ALTER PROCEDURE usp_SubmitSurveyResponse
    @SurveyID INT,
    @QuestionID INT,
    @Answer VARCHAR|(255)
AS
BEGIN
    INSERT INTO SurveyResponses (SurveyID, QuestionID, Answer)
    VALUES (@SurveyID, @QuestionID, @Answer);
END;