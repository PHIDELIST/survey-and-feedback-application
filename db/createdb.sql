CREATE DATABASE SurveyFeedBack

CREATE TABLE Admins (
  AdminID INT PRIMARY KEY IDENTITY(1,1),
  AdminName VARCHAR(26) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  FOREIGN KEY (LocationID) REFERENCES Locations(LocationID) ON DELETE SET NULL
);

CREATE TABLE Users (
  UserID INT PRIMARY KEY IDENTITY(1,1),
  UserName VARCHAR(26) NOT NULL,
  UserEmail VARCHAR(255) NOT NULL

);

CREATE TABLE Surveys (
  SurveyID INT PRIMARY KEY IDENTITY(1,1),
  Title VARCHAR(255) NOT NULL,
  Description TEXT,
  StartDate DATE,
  EndDate DATE,
  Active BIT DEFAULT 0,
  AdminID INT,
  FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE CASCADE
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

CREATE TABLE AdminProfile (
  AdminProfileID INT PRIMARY KEY IDENTITY(1,1),
  AdminID INT,
  Country VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  OrganizationType VARCHAR(255) NOT NULL,
  OrganizationName VARCHAR(255) NOT NULL,
  FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE CASCADE
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
CREATE TABLE Feedback (
    Id INT PRIMARY KEY IDENTITY,
    FeedbackType NVARCHAR(255),
    FeedbackText NVARCHAR(MAX),
    SubmittedDate DATETIME DEFAULT GETDATE()
)
