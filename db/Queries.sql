-- Get all active surveys
SELECT *
FROM Surveys
WHERE active = 1;

-- Get all questions for a specific survey
SELECT *
FROM Questions
WHERE surveyId = [surveyId];

-- Get all options for a specific question
SELECT *
FROM Options
WHERE questionId = [questionId];

-- Get survey analytics for a specific survey
SELECT *
FROM SurveyAnalytics
WHERE surveyId = [surveyId];

-- Get responses for a specific survey
SELECT *
FROM Responses
WHERE surveyId = [surveyId];

-- Get user feedback for a specific user
SELECT *
FROM UserFeedback
WHERE userId = [userId];

-- Get all participants for a specific survey
SELECT *
FROM SurveyParticipants
WHERE surveyId = [surveyId];

-- Get survey questions and their order for survey with ID 1
SELECT q.questionId, q.questionText, sq.questionOrder
FROM Questions q
JOIN SurveyQuestions sq ON q.questionId = sq.questionId
WHERE sq.surveyId = 1
ORDER BY sq.questionOrder;


-- Get average rating for a specific question
SELECT questionId, AVG(ratingValue) AS averageRating
FROM Ratings
WHERE questionId = [questionId]
GROUP BY questionId;

-- Get user authentication details for a specific user
SELECT *
FROM UserAuthentication
WHERE userId = [userId];
