-- Insert sample records into Users table
INSERT INTO Users (firstName, email, password, country, createdDate)
VALUES
('John', 'john@example.com', 'password123', 'USA', '2023-06-01'),
('Emma', 'emma@example.com', 'pass456', 'Canada', '2023-06-02'),
('Michael', 'michael@example.com', 'secret', 'Australia', '2023-06-03'),
('Sophia', 'sophia@example.com', '12345678', 'UK', '2023-06-04'),
('Daniel', 'daniel@example.com', 'qwerty', 'Germany', '2023-06-05');

-- Insert sample records into Organization table
INSERT INTO Organization (organizationName, organizationType)
VALUES
('Organization 1', 'Type 1'),
('Organization 2', 'Type 2'),
('Organization 3', 'Type 3'),
('Organization 4', 'Type 1'),
('Organization 5', 'Type 2');

-- Insert sample records into Admins table
INSERT INTO Admins (firstName, lastName, country, email, phoneNumber, registrationDate, password, organizationId)
VALUES
('Admin 1', 'Smith', 'USA', 'admin1@example.com', '1234567890', '2023-06-01', 'adminpass1', 1),
('Admin 2', 'Johnson', 'Canada', 'admin2@example.com', '9876543210', '2023-06-02', 'adminpass2', 2),
('Admin 3', 'Williams', 'Australia', 'admin3@example.com', '4567890123', '2023-06-03', 'adminpass3', 3),
('Admin 4', 'Brown', 'UK', 'admin4@example.com', '0123456789', '2023-06-04', 'adminpass4', 4),
('Admin 5', 'Jones', 'Germany', 'admin5@example.com', '6789012345', '2023-06-05', 'adminpass5', 5);

-- Insert sample records into Surveys table
INSERT INTO Surveys (title, description, startDate, endDate, active, adminId)
VALUES
('Survey 1', 'Description for Survey 1', '2023-06-01', '2023-06-10', 1, 1),
('Survey 2', 'Description for Survey 2', '2023-06-02', '2023-06-12', 1, 2),
('Survey 3', 'Description for Survey 3', '2023-06-03', '2023-06-15', 1, 3),
('Survey 4', 'Description for Survey 4', '2023-06-04', '2023-06-18', 1, 4),
('Survey 5', 'Description for Survey 5', '2023-06-05', '2023-06-20', 1, 5);

-- Insert sample records into Questions table
INSERT INTO Questions (surveyId, questionText)
VALUES
(1, 'Question 1 for Survey 1'),
(1, 'Question 2 for Survey 1'),
(2, 'Question 1 for Survey 2'),
(2, 'Question 2 for Survey 2'),
(3, 'Question 1 for Survey 3'),
(3, 'Question 2 for Survey 3'),
(4, 'Question 1 for Survey 4'),
(4, 'Question 2 for Survey 4'),
(5, 'Question 1 for Survey 5'),
(5, 'Question 2 for Survey 5');

-- Insert sample records into Options table
INSERT INTO Options (questionId, optionText)
VALUES
(1, 'Option 1 for Question 1'),
(1, 'Option 2 for Question 1'),
(1, 'Option 3 for Question 1'),
(2, 'Option 1 for Question 2'),
(2, 'Option 2 for Question 2'),
(2, 'Option 3 for Question 2'),
(3, 'Option 1 for Question 3'),
(3, 'Option 2 for Question 3'),
(3, 'Option 3 for Question 3'),
(4, 'Option 1 for Question 4'),
(4, 'Option 2 for Question 4'),
(4, 'Option 3 for Question 4'),
(5, 'Option 1 for Question 5'),
(5, 'Option 2 for Question 5'),
(5, 'Option 3 for Question 5');

-- Insert sample records into Responses table
INSERT INTO Responses (userId, surveyId, questionId, optionId, answer, createdAt)
VALUES
(1, 1, 1, 1, 'Answer 1 for Response 1', '2023-06-01'),
(2, 1, 2, 2, 'Answer 2 for Response 1', '2023-06-01'),
(3, 2, 1, 3, 'Answer 1 for Response 2', '2023-06-02'),
(3, 2, 2, 1, 'Answer 2 for Response 2', '2023-06-02'),
(4, 3, 1, 2, 'Answer 1 for Response 3', '2023-06-03'),
(4, 3, 2, 3, 'Answer 2 for Response 3', '2023-06-03'),
(5, 3, 1, 1, 'Answer 1 for Response 4', '2023-06-03'),
(5, 3, 2, 2, 'Answer 2 for Response 4', '2023-06-03'),
(1, 4, 1, 3, 'Answer 1 for Response 5', '2023-06-04'),
(2, 4, 2, 1, 'Answer 2 for Response 5', '2023-06-04'),
(1, 5, 1, 2, 'Answer 1 for Response 6', '2023-06-05'),
(5, 5, 2, 3, 'Answer 2 for Response 6', '2023-06-05');

-- Insert sample records into UserFeedback table
INSERT INTO UserFeedback (userId, feedbackText, createdAt)
VALUES
(1, 'Feedback 1 from User 1', '2023-06-01'),
(2, 'Feedback 1 from User 2', '2023-06-02'),
(3, 'Feedback 1 from User 3', '2023-06-03'),
(4, 'Feedback 1 from User 4', '2023-06-04'),
(5, 'Feedback 1 from User 5', '2023-06-05');

-- Insert sample records into SurveyAnalytics table
INSERT INTO SurveyAnalytics (surveyId, responseCount, averageRating, completionRate, startDate, endDate)
VALUES
(1, 10, 4.2, 80.5, '2023-06-01', '2023-06-10'),
(2, 8, 3.8, 64.3, '2023-06-02', '2023-06-12'),
(3, 12, 4.5, 90.0, '2023-06-03', '2023-06-15'),
(4, 6, 3.2, 48.0, '2023-06-04', '2023-06-18'),
(5, 9, 4.0, 60.0, '2023-06-05', '2023-06-20');

-- Insert sample records into SurveyParticipants table
INSERT INTO SurveyParticipants (surveyId, userId)
VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3),
(3, 4),
(4, 4),
(4, 5),
(5, 1),
(5, 5);

-- Insert sample records into SurveyQuestions table
INSERT INTO SurveyQuestions (surveyId, questionId, questionOrder)
VALUES
(1, 1, 1),
(1, 2, 2),
(2, 1, 1),
(2, 2, 2),
(3, 1, 1),
(3, 2, 2),
(4, 1, 1),
(4, 2, 2),
(5, 1, 1),
(5, 2, 2);

-- Insert sample records into Ratings table
INSERT INTO Ratings (questionId, ratingValue, ratingLabel)
VALUES
(1, 1, 'Poor'),
(1, 2, 'Fair'),
(1, 3, 'Average'),
(1, 4, 'Good'),
(1, 5, 'Excellent'),
(2, 1, 'Poor'),
(2, 2, 'Fair'),
(2, 3, 'Average'),
(2, 4, 'Good'),
(2, 5, 'Excellent');

-- Insert sample records into UserAuthentication table
INSERT INTO UserAuthentication (userId, email, password, accessLevel)
VALUES
(1, 'john@example.com', 'password123', 1),
(2, 'emma@example.com', 'pass456', 2),
(3, 'michael@example.com', 'secret', 1),
(4, 'sophia@example.com', '12345678', 3),
(5, 'daniel@example.com', 'qwerty', 2);
