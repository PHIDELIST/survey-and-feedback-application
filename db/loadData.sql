-- Users table
INSERT INTO Users (userId, firstName, lastName, createdDate)
VALUES
  (1, 'John', 'Doe', '2022-01-01'),
  (2, 'Jane', 'Smith', '2022-02-15'),
  (3, 'Michael', 'Johnson', '2022-03-10'),
  (4, 'Emily', 'Davis', '2022-04-20'),
  (5, 'David', 'Anderson', '2022-05-05');

-- Admins table
INSERT INTO Admins (adminId, firstName, lastName, email, phoneNumber, registrationDate, password)
VALUES
  (1, 'Admin', 'One', 'admin1@example.com', '1234567890', '2022-01-01', 'admin1password'),
  (2, 'Admin', 'Two', 'admin2@example.com', '0987654321', '2022-02-15', 'admin2password'),
  (3, 'Admin', 'Three', 'admin3@example.com', '9876543210', '2022-03-10', 'admin3password'),
  (4, 'Admin', 'Four', 'admin4@example.com', '0123456789', '2022-04-20', 'admin4password'),
  (5, 'Admin', 'Five', 'admin5@example.com', '5678901234', '2022-05-05', 'admin5password');

-- Surveys table
INSERT INTO Surveys (surveyId, title, description, startDate, endDate, active, adminId)
VALUES
  (1, 'Customer Satisfaction Survey', 'Please rate your experience with our products and services.', '2022-01-01', '2022-01-31', 1, 1),
  (2, 'Employee Engagement Survey', 'Provide feedback on your work environment and job satisfaction.', '2022-02-15', '2022-03-15', 1, 2),
  (3, 'Product Feedback Survey', 'Share your opinions on our latest product offerings.', '2022-03-10', '2022-04-10', 1, 3),
  (4, 'Website Usability Survey', 'Help us improve our website by providing feedback on its usability.', '2022-04-20', '2022-05-20', 1, 4),
  (5, 'Event Feedback Survey', 'Tell us about your experience attending our recent event.', '2022-05-05', '2022-06-05', 1, 5);

-- Questions table
INSERT INTO Questions (questionId, surveyId, questionText)
VALUES
  (1, 1, 'How satisfied are you with our customer service?'),
  (2, 1, 'Rate the quality of our products.'),
  (3, 2, 'Do you feel valued and appreciated at your workplace?'),
  (4, 2, 'How satisfied are you with the communication within the company?'),
  (5, 3, 'Which product feature do you find most valuable?');

-- Options table
INSERT INTO Options (optionId, questionId, optionText)
VALUES
  (1, 1, 'Very Satisfied'),
  (2, 1, 'Satisfied'),
  (3, 1, 'Neutral'),
  (4, 1, 'Dissatisfied'),
  (5, 1, 'Very Dissatisfied'),
  (6, 2, 'Excellent'),
  (7, 2, 'Good'),
  (8, 2, 'Fair'),
  (9, 2, 'Poor'),
  (10, 2, 'Very Poor');

-- Responses table
INSERT INTO Responses (responseId, userId, surveyId, questionId, optionId, answer, createdAt)
VALUES
  (1, 1, 1, 1, 2, NULL, '2022-01-05'),
  (2, 1, 1, 2, 6, NULL, '2022-01-05'),
  (3, 2, 1, 1, 3, NULL, '2022-01-06'),
  (4, 2, 1, 2, 7, NULL, '2022-01-06'),
  (5, 3, 2, 3, NULL, 'Yes, I feel valued.', '2022-02-18'),
  (6, 3, 2, 4, NULL, 'I am satisfied with the communication.', '2022-02-18');

-- UserFeedback table
INSERT INTO UserFeedback (feedbackId, userId, feedbackText, createdAt)
VALUES
  (1, 1, 'Great service!', '2022-01-05'),
  (2, 2, 'The product quality could be better.', '2022-01-06'),
  (3, 3, 'I love working here!', '2022-02-20'),
  (4, 4, 'Communication needs improvement.', '2022-02-22'),
  (5, 5, 'The website is user-friendly.', '2022-05-10');

-- SurveyAnalytics table
INSERT INTO SurveyAnalytics (analyticsId, surveyId, responseCount, averageRating, completionRate, startDate, endDate)
VALUES
  (1, 1, 2, 4.5, 100.0, '2022-01-01', '2022-01-31'),
  (2, 2, 2, NULL, 100.0, '2022-02-15', '2022-03-15'),
  (3, 3, 1, NULL, 100.0, '2022-03-10', '2022-04-10'),
  (4, 4, 0, NULL, 0.0, '2022-04-20', '2022-05-20'),
  (5, 5, 0, NULL, 0.0, '2022-05-05', '2022-06-05');

-- SurveyParticipants table
INSERT INTO SurveyParticipants (surveyId, userId)
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (2, 3),
  (3, 3),
  (4, 4),
  (5, 5);

-- SurveyQuestions table
INSERT INTO SurveyQuestions (surveyId, questionId, questionOrder)
VALUES
  (1, 1, 1),
  (1, 2, 2),
  (2, 3, 1),
  (2, 4, 2),
  (3, 5, 1);

-- Ratings table
INSERT INTO Ratings (ratingId, questionId, ratingValue, ratingLabel)
VALUES
  (1, 1, 1, 'Very Satisfied'),
  (2, 1, 2, 'Satisfied'),
  (3, 1, 3, 'Neutral'),
  (4, 1, 4, 'Dissatisfied'),
  (5, 1, 5, 'Very Dissatisfied'),
  (6, 2, 1, 'Excellent'),
  (7, 2, 2, 'Good'),
  (8, 2, 3, 'Fair'),
  (9, 2, 4, 'Poor'),
  (10, 2, 5, 'Very Poor');

-- UserAuthentication table
INSERT INTO UserAuthentication (userId, username, password, accessLevel)
VALUES
  (1, 'john.doe', 'password1', 1),
  (2, 'jane.smith', 'password2', 2),
  (3, 'michael.johnson', 'password3', 2),
  (4, 'emily.davis', 'password4', 3),
  (5, 'david.anderson', 'password5', 3);
