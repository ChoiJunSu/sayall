CREATE DATABASE IF NOT EXISTS main
    DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE main;

CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(20) NOT NULL UNIQUE,
    pw VARCHAR(100) NOT NULL,
    name VARCHAR(20) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL,
    nickname VARCHAR(20) NOT NULL,
    CONSTRAINT userPk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS company (
    id INT(20) NOT NULL AUTO_INCREMENT UNIQUE ,
    name VARCHAR(20) NOT NULL UNIQUE,
    CONSTRAINT companyPk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS profile (
    id INT(20) NOT NULL AUTO_INCREMENT UNIQUE,
    userId VARCHAR(20) NOT NULL,
    companyId INT(20) NOT NULL,
    position VARCHAR(20) NOT NULL,
    department VARCHAR(20) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE,
    CONSTRAINT profilePk PRIMARY KEY (id),
    CONSTRAINT profileUserFk FOREIGN KEY (userId) REFERENCES user(id) ON UPDATE CASCADE,
    CONSTRAINT profileCompanyFk FOREIGN KEY (companyId) REFERENCES company(id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS request (
    id INT(20) NOT NULL AUTO_INCREMENT UNIQUE,
    senderId VARCHAR(20) NOT NULL,
    receiverId VARCHAR(20) NOT NULL,
    companyId INT(20) NOT NULL,
    targetName VARCHAR(20) NOT NULL,
    reply TEXT,
    status VARCHAR(20) NOT NULL,
    CONSTRAINT requestPk PRIMARY KEY (id),
    CONSTRAINT requestSenderUserFk FOREIGN KEY (senderId) REFERENCES user(id) ON UPDATE CASCADE,
    CONSTRAINT requestReceiverUserFk FOREIGN KEY (receiverId) REFERENCES user(id) ON UPDATE CASCADE,
    CONSTRAINT requestCompanyFk FOREIGN KEY (companyId) REFERENCES company(id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS rating (
    id INT(20) NOT NULL AUTO_INCREMENT UNIQUE,
    requestId INT(20) NOT NULL,
    userId VARCHAR(20) NOT NULL,
    objectivity INT(5) NOT NULL,
    quickness INT(5) NOT NULL,
    kindness INT(5) NOT NULL,
    CONSTRAINT ratingPk PRIMARY KEY (id),
    CONSTRAINT ratingRequestId FOREIGN KEY (requestId) REFERENCES request(id) ON UPDATE CASCADE,
    CONSTRAINT ratingRequestUser FOREIGN KEY (userId) REFERENCES request(receiverId) ON UPDATE CASCADE,
    CONSTRAINT objectivityCheck CHECK (objectivity >= 0 AND objectivity <= 10),
    CONSTRAINT quicknessCheck CHECK (quickness >= 0 AND quickness <= 10),
    CONSTRAINT kindnessCheck CHECK (kindness >= 0 AND kindness <= 10)
)
