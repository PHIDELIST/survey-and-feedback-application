CREATE DATABASE SurveyFeedBack

CREATE TABLE Locations (
  LocationID INT PRIMARY KEY IDENTITY(1,1),
  Country VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
);

CREATE TABLE Users (
  UserID INT PRIMARY KEY IDENTITY(1,1),
  Username VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Role VARCHAR(255),
  LocationID INT,
  FOREIGN KEY (LocationID) REFERENCES Locations(LocationID) ON DELETE SET NULL
);

CREATE TABLE Surveys (
  SurveyID INT PRIMARY KEY IDENTITY(1,1),
  Title VARCHAR(255) NOT NULL,
  Description TEXT,
  StartDate DATE,
  EndDate DATE,
  Active BIT DEFAULT 0,
  CONSTRAINT CHK_SurveyDates CHECK (EndDate >= StartDate)
);

CREATE TABLE Questions (
  QuestionID INT PRIMARY KEY IDENTITY(1,1),
  SurveyID INT,
  QuestionText TEXT,
  Type VARCHAR(255),
  FOREIGN KEY (SurveyID) REFERENCES Surveys(SurveyID) ON DELETE CASCADE
);

CREATE TABLE Options (
  OptionID INT PRIMARY KEY IDENTITY(1,1),
  QuestionID INT,
  OptionText TEXT,
  FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID) ON DELETE CASCADE
);

CREATE TABLE SurveyResponses (
  ResponseID INT PRIMARY KEY IDENTITY(1,1),
  SurveyID INT,
  UserID INT,
  QuestionID INT,
  OptionID INT,
  ResponseText TEXT,
  Timestamp TIMESTAMP,
  FOREIGN KEY (SurveyID) REFERENCES Surveys(SurveyID) ON DELETE CASCADE,
  FOREIGN KEY (UserID) REFERENCES Users(UserID) ,
  FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID) ,
  FOREIGN KEY (OptionID) REFERENCES Options(OptionID)
);

CREATE TABLE AdminUsers (
  AdminID INT PRIMARY KEY IDENTITY(1,1),
  UserID INT,
  FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE UserSurveys (
  UserSurveyID INT PRIMARY KEY IDENTITY(1,1),
  UserID INT,
  SurveyID INT,
  FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
  FOREIGN KEY (SurveyID) REFERENCES Surveys(SurveyID) ON DELETE CASCADE
);

CREATE TABLE SurveyQuestions (
  SurveyQuestionID INT PRIMARY KEY IDENTITY(1,1),
  SurveyID INT,
  QuestionID INT,
  FOREIGN KEY (SurveyID) REFERENCES Surveys(SurveyID) ,
  FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID) ON DELETE CASCADE
);

CREATE TABLE ResponseOptions (
  ResponseOptionID INT PRIMARY KEY IDENTITY(1,1),
  ResponseID INT,
  QuestionID INT,
  OptionID INT,
  FOREIGN KEY (ResponseID) REFERENCES SurveyResponses(ResponseID) ON DELETE CASCADE,
  FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID),
  FOREIGN KEY (OptionID) REFERENCES Options(OptionID)
);

CREATE TABLE Analytics (
  AnalyticsID INT PRIMARY KEY IDENTITY(1,1),
  SurveyID INT,
  QuestionID INT,
  ResponseCount INT,
  AverageRating DECIMAL(5,2),
  CompletionRate DECIMAL(5,2),
  FOREIGN KEY (SurveyID) REFERENCES Surveys(SurveyID) ON DELETE CASCADE,
  FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID)
);
