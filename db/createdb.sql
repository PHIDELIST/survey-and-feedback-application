CREATE DATABASE SurveyFeedBack

CREATE TABLE Admins (
  AdminID INT PRIMARY KEY IDENTITY(1,1),
  AdminName VARCHAR(26) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Country VARCHAR(255) NOT NULL,
  City VARCHAR(255) NOT NULL,
  OrganizationType VARCHAR(255) NOT NULL,
  OrganizationName VARCHAR(255) NOT NULL,
  FOREIGN KEY (LocationID) REFERENCES Locations(LocationID) ON DELETE SET NULL
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
  id INT PRIMARY KEY IDENTITY,
  SurveyID INT,
  answerValue NVARCHAR(MAX)
  FOREIGN KEY (SurveyID) REFERENCES Surveys (SurveyID) ON DELETE CASCADE
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
