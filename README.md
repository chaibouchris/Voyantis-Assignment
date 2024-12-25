# Queue Manager Application

This is a Queue Manager application built with a **Spring Boot backend** and a **React frontend**. The application allows users to create queues, manage messages, and interact with a RESTful API.

## Features
- Create new queues.
- Add messages to queues.
- Fetch messages from queues with an optional timeout.
- View the list of all available queues and the number of messages in each.

## Technologies Used
- **Backend:** Java, Spring Boot
- **Frontend:** React, Axios, CSS 

## Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed
- [Maven](https://maven.apache.org/download.cgi) installed (optional if not using the Maven wrapper)

### Steps to Run the Application

#### Backend
1. Navigate to the project root directory:
   cd Voyantis

2. Run the application using the Maven Wrapper:
   ./mvnw spring-boot:run

Or, if Maven is installed globally:
mvn spring-boot:run

3. The backend server will be available at http://localhost:8080.

#### Frontend
1. Navigate to the frontend folder:
cd frontened

2. Install dependencies:
npm install

3. Start the frontend application:
npm start

4. The frontend will be available at http://localhost:3000.






