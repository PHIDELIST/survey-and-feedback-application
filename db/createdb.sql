CREATE DATABASE SurveyFeedBack

-- Users table
CREATE TABLE Users (
  userId INT PRIMARY KEY IDENTITY(1,1),
  firstName VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  country VARCHAR(50) NOT NULL,
  createdDate DATE NOT NULL
);


-- Organization Table
CREATE TABLE Organization(
  organizationId INT PRIMARY KEY IDENTITY(1,1),
  organizationName VARCHAR(50) NOT NULL,
  organizationType VARCHAR(50) NOT NULL
)
-- Admins table---
CREATE TABLE Admins (
  adminId INT PRIMARY KEY IDENTITY(1,1),
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  registrationDate DATE NOT NULL,
  password VARCHAR(100) NOT NULL,
  organizationId INT,
  FOREIGN KEY (organizationId) REFERENCES Organization(organizationId)
);


-- Surveys table--
CREATE TABLE Surveys (
  surveyId INT PRIMARY KEY IDENTITY(1,1),
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  active BIT NOT NULL,
  adminId INT,
  FOREIGN KEY (adminId) REFERENCES Admins(adminId)
);

-- Questions table
CREATE TABLE Questions (
  questionId INT PRIMARY KEY IDENTITY(1,1),
  surveyId INT,
  questionText VARCHAR(500) NOT NULL,
  FOREIGN KEY (surveyId) REFERENCES Surveys(surveyId)
);

-- Options table
CREATE TABLE Options (
  optionId INT PRIMARY KEY IDENTITY(1,1),
  questionId INT,
  optionText VARCHAR(500) NOT NULL,
  FOREIGN KEY (questionId) REFERENCES Questions(questionId)
);

-- Responses table---
CREATE TABLE Responses (
  responseId INT PRIMARY KEY IDENTITY(1,1),
  userId INT,
  surveyId INT,
  questionId INT,
  optionId INT,
  answer TEXT,
  createdAt DATE,
  FOREIGN KEY (userId) REFERENCES Users(userId),
  FOREIGN KEY (surveyId) REFERENCES Surveys(surveyId),
  FOREIGN KEY (questionId) REFERENCES Questions(questionId),
  FOREIGN KEY (optionId) REFERENCES Options(optionId)
);

-- UserFeedback table---
CREATE TABLE UserFeedback (
  feedbackId INT PRIMARY KEY IDENTITY(1,1),
  userId INT,
  feedbackText TEXT,
  createdAt DATE,
  FOREIGN KEY (userId) REFERENCES Users(userId)
);

-- SurveyAnalytics table---
CREATE TABLE SurveyAnalytics (
  analyticsId INT PRIMARY KEY IDENTITY(1,1),
  surveyId INT,
  responseCount INT,
  averageRating DECIMAL(5,2),
  completionRate DECIMAL(5,2),
  startDate DATE,
  endDate DATE,
  FOREIGN KEY (surveyId) REFERENCES Surveys(surveyId)
);

-- SurveyParticipants table--
CREATE TABLE SurveyParticipants (
  surveyId INT,
  userId INT,
  FOREIGN KEY (surveyId) REFERENCES Surveys(surveyId),
  FOREIGN KEY (userId) REFERENCES Users(userId),
  CONSTRAINT PK_SurveyParticipants PRIMARY KEY (surveyId, userId)
);

-- SurveyQuestions table--
CREATE TABLE SurveyQuestions (
  surveyId INT,
  questionId INT,
  questionOrder INT,
  FOREIGN KEY (surveyId) REFERENCES Surveys(surveyId),
  FOREIGN KEY (questionId) REFERENCES Questions(questionId),
  CONSTRAINT PK_SurveyQuestions PRIMARY KEY (surveyId, questionId)
);

-- Ratings table--
CREATE TABLE Ratings (
  ratingId INT PRIMARY KEY IDENTITY(1,1),
  questionId INT,
  ratingValue INT,
  ratingLabel VARCHAR(50),
  FOREIGN KEY (questionId) REFERENCES Questions(questionId)
);

-- UserAuthentication table--
CREATE TABLE UserAuthentication (
  userId INT ,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  accessLevel INT,
  FOREIGN KEY (userId) REFERENCES Users(userId),
  CONSTRAINT PK_UserAuthentication PRIMARY KEY (userId, email)
);
