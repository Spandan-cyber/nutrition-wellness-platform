# Requirements Document

## Introduction

The Nutrition and Wellness Platform is a full-stack web application that enables users to track their daily nutritional intake and monitor progress toward their macro and calorie goals. The system provides user authentication, a food logging interface, and visual progress tracking for macronutrients (Protein, Carbs, Fats) and total Calories.

The platform consists of a React frontend built with Vite and a Node.js/Express backend that integrates with AWS services including Amazon Cognito for authentication and DynamoDB for persistent storage of nutrition logs.

## Glossary

- **Platform**: The complete Nutrition and Wellness Platform system including frontend and backend
- **User**: A person who registers and uses the platform to track nutrition
- **Auth_Service**: The authentication service using Amazon Cognito
- **Frontend**: The React-based user interface built with Vite
- **Backend**: The Node.js/Express API server
- **Food_Log**: A record of a single food intake item with nutritional information
- **Daily_History**: The collection of all Food_Logs for a specific date
- **Macro**: Short for macronutrient (Protein, Carbs, or Fats)
- **Progress_Tracker**: Visual component displaying current intake versus goals
- **Dashboard**: The main interface for viewing and logging nutrition data
- **Log_API**: The backend API endpoints for managing Food_Logs
- **Database**: The DynamoDB instance storing user data and Food_Logs

## Requirements

### Requirement 1: User Registration

**User Story:** As a new user, I want to register for an account, so that I can start tracking my nutrition data.

#### Acceptance Criteria

1. THE Frontend SHALL provide a registration form with fields for email, password, and password confirmation
2. WHEN a user submits the registration form with valid data, THE Auth_Service SHALL create a new user account in Amazon Cognito
3. WHEN a user submits the registration form with an email that already exists, THE Auth_Service SHALL return an error message indicating the email is already registered
4. WHEN a user submits the registration form with a password shorter than 8 characters, THE Auth_Service SHALL return an error message indicating the password does not meet minimum requirements
5. WHEN registration succeeds, THE Frontend SHALL redirect the user to the login page with a success message
6. IF registration fails due to network errors, THEN THE Frontend SHALL display an error message and allow the user to retry

### Requirement 2: User Login

**User Story:** As a registered user, I want to log into my account, so that I can access my nutrition tracking data.

#### Acceptance Criteria

1. THE Frontend SHALL provide a login form with fields for email and password
2. WHEN a user submits the login form with valid credentials, THE Auth_Service SHALL authenticate the user against Amazon Cognito
3. WHEN authentication succeeds, THE Auth_Service SHALL return an authentication token to the Frontend
4. WHEN authentication succeeds, THE Frontend SHALL store the authentication token securely and redirect the user to the Dashboard
5. WHEN a user submits the login form with invalid credentials, THE Auth_Service SHALL return an error message indicating authentication failed
6. IF authentication fails due to network errors, THEN THE Frontend SHALL display an error message and allow the user to retry

### Requirement 3: User Logout

**User Story:** As a logged-in user, I want to log out of my account, so that I can secure my data when finished.

#### Acceptance Criteria

1. WHILE a user is authenticated, THE Frontend SHALL display a logout button
2. WHEN a user clicks the logout button, THE Frontend SHALL clear the stored authentication token
3. WHEN a user clicks the logout button, THE Frontend SHALL redirect the user to the login page
4. WHEN a user logs out, THE Auth_Service SHALL invalidate the user session in Amazon Cognito

### Requirement 4: Session Management

**User Story:** As a user, I want my session to persist across page refreshes, so that I don't have to log in repeatedly.

#### Acceptance Criteria

1. WHEN a user successfully authenticates, THE Frontend SHALL store the authentication token in browser storage
2. WHEN a user refreshes the page, THE Frontend SHALL check for a valid authentication token
3. IF a valid authentication token exists, THEN THE Frontend SHALL maintain the authenticated session and display the Dashboard
4. IF the authentication token is expired or invalid, THEN THE Frontend SHALL redirect the user to the login page
5. WHEN the authentication token expires, THE Frontend SHALL prompt the user to log in again

### Requirement 5: Daily Food Logging Dashboard

**User Story:** As a user, I want to view a dashboard showing my daily nutrition intake, so that I can monitor my progress toward my goals.

#### Acceptance Criteria

1. WHEN an authenticated user accesses the Dashboard, THE Frontend SHALL display the current date
2. THE Dashboard SHALL display four Progress_Tracker components for Protein, Carbs, Fats, and Calories
3. WHEN the Dashboard loads, THE Frontend SHALL request the Daily_History from the Log_API
4. WHEN the Daily_History is received, THE Dashboard SHALL calculate and display the total intake for each Macro and total Calories
5. THE Dashboard SHALL display a list of all Food_Logs for the current date in reverse chronological order
6. IF no Food_Logs exist for the current date, THEN THE Dashboard SHALL display a message indicating no logs have been recorded

### Requirement 6: Visual Progress Tracking

**User Story:** As a user, I want to see visual indicators of my macro and calorie intake, so that I can quickly understand my progress toward daily goals.

#### Acceptance Criteria

1. THE Progress_Tracker SHALL display the nutrient name (Protein, Carbs, Fats, or Calories)
2. THE Progress_Tracker SHALL display the current intake value in appropriate units (grams for Macros, kcal for Calories)
3. THE Progress_Tracker SHALL display the daily goal value in appropriate units
4. THE Progress_Tracker SHALL display a visual progress bar showing the percentage of the goal achieved
5. WHEN current intake equals or exceeds the goal, THE Progress_Tracker SHALL display the progress bar at 100 percent
6. WHEN current intake is below the goal, THE Progress_Tracker SHALL display the progress bar proportional to the percentage achieved

### Requirement 7: Food Intake Logging Form

**User Story:** As a user, I want to log a food item with its nutritional information, so that I can track my daily intake.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a form for logging food intake
2. THE food logging form SHALL include fields for food name, protein (grams), carbs (grams), fats (grams), and calories (kcal)
3. WHEN a user submits the food logging form with valid data, THE Frontend SHALL send the Food_Log to the Log_API
4. WHEN a user submits the food logging form with missing required fields, THE Frontend SHALL display validation errors indicating which fields are required
5. WHEN a user submits the food logging form with non-numeric values for nutritional fields, THE Frontend SHALL display validation errors indicating numeric values are required
6. WHEN the Log_API confirms the Food_Log was saved, THE Frontend SHALL clear the form and refresh the Dashboard to show the new entry

### Requirement 8: Save Food Log API Endpoint

**User Story:** As a developer, I want a POST endpoint to save food logs, so that the Frontend can persist user nutrition data.

#### Acceptance Criteria

1. THE Backend SHALL provide a POST endpoint at /api/logs
2. WHEN a POST request is received at /api/logs with a valid authentication token, THE Backend SHALL extract the user identity from the token
3. WHEN a POST request is received at /api/logs with valid Food_Log data, THE Backend SHALL save the Food_Log to the Database with the user identity and current timestamp
4. WHEN a Food_Log is successfully saved, THE Backend SHALL return a success response with HTTP status 201 and the saved Food_Log data
5. WHEN a POST request is received at /api/logs without a valid authentication token, THE Backend SHALL return an error response with HTTP status 401
6. WHEN a POST request is received at /api/logs with invalid or incomplete Food_Log data, THE Backend SHALL return an error response with HTTP status 400 and validation error details
7. IF the Database operation fails, THEN THE Backend SHALL return an error response with HTTP status 500

### Requirement 9: Retrieve Daily History API Endpoint

**User Story:** As a developer, I want a GET endpoint to retrieve daily food logs, so that the Frontend can display the user's nutrition history.

#### Acceptance Criteria

1. THE Backend SHALL provide a GET endpoint at /api/logs
2. WHEN a GET request is received at /api/logs with a valid authentication token, THE Backend SHALL extract the user identity from the token
3. THE GET endpoint SHALL accept an optional date query parameter in ISO 8601 format
4. WHEN a GET request is received with a date parameter, THE Backend SHALL retrieve all Food_Logs for that user and date from the Database
5. WHEN a GET request is received without a date parameter, THE Backend SHALL retrieve all Food_Logs for that user and the current date from the Database
6. WHEN Food_Logs are successfully retrieved, THE Backend SHALL return a success response with HTTP status 200 and an array of Food_Logs sorted by timestamp descending
7. WHEN a GET request is received at /api/logs without a valid authentication token, THE Backend SHALL return an error response with HTTP status 401
8. IF the Database operation fails, THEN THE Backend SHALL return an error response with HTTP status 500

### Requirement 10: Data Persistence

**User Story:** As a user, I want my food logs to be saved permanently, so that I can access my historical nutrition data.

#### Acceptance Criteria

1. THE Backend SHALL store all Food_Logs in DynamoDB
2. THE Database SHALL store the user identity, timestamp, food name, protein, carbs, fats, and calories for each Food_Log
3. THE Database SHALL use a composite key of user identity and timestamp to ensure unique Food_Logs
4. WHEN a Food_Log is saved, THE Database SHALL persist the data durably
5. WHEN a Food_Log is retrieved, THE Database SHALL return the complete Food_Log data as originally saved

### Requirement 11: Authentication Token Validation

**User Story:** As a developer, I want the backend to validate authentication tokens, so that only authorized users can access their data.

#### Acceptance Criteria

1. WHEN the Backend receives a request to a protected endpoint, THE Backend SHALL extract the authentication token from the request headers
2. WHEN an authentication token is present, THE Backend SHALL verify the token with Amazon Cognito
3. WHEN the token is valid, THE Backend SHALL extract the user identity and process the request
4. WHEN the token is invalid or expired, THE Backend SHALL return an error response with HTTP status 401
5. WHEN no authentication token is present, THE Backend SHALL return an error response with HTTP status 401

### Requirement 12: Error Handling and User Feedback

**User Story:** As a user, I want to receive clear error messages when something goes wrong, so that I understand what happened and how to fix it.

#### Acceptance Criteria

1. WHEN an error occurs in the Frontend, THE Frontend SHALL display a user-friendly error message
2. WHEN an API request fails, THE Frontend SHALL display the error message returned by the Backend
3. WHEN a network error occurs, THE Frontend SHALL display a message indicating the connection failed and suggest retrying
4. THE Backend SHALL return descriptive error messages for all error conditions
5. THE Backend SHALL log all errors with sufficient detail for debugging

### Requirement 13: Responsive Dashboard Layout

**User Story:** As a user, I want the dashboard to work on different screen sizes, so that I can track nutrition on any device.

#### Acceptance Criteria

1. THE Dashboard SHALL use a responsive layout that adapts to different screen widths
2. WHEN viewed on a desktop screen, THE Dashboard SHALL display Progress_Trackers in a horizontal row
3. WHEN viewed on a mobile screen, THE Dashboard SHALL stack Progress_Trackers vertically
4. THE food logging form SHALL remain usable on mobile devices with appropriate touch targets
5. THE Food_Log list SHALL be scrollable on all screen sizes

### Requirement 14: Date Navigation

**User Story:** As a user, I want to view my food logs from previous days, so that I can review my historical nutrition data.

#### Acceptance Criteria

1. THE Dashboard SHALL provide navigation controls to select different dates
2. WHEN a user selects a different date, THE Frontend SHALL request the Daily_History for that date from the Log_API
3. WHEN the Daily_History for the selected date is received, THE Dashboard SHALL update to display the Food_Logs and Progress_Trackers for that date
4. THE Dashboard SHALL clearly indicate which date is currently being viewed
5. THE Dashboard SHALL provide a button to quickly return to the current date

### Requirement 15: Input Validation and Sanitization

**User Story:** As a developer, I want to validate and sanitize all user inputs, so that the system is protected from invalid or malicious data.

#### Acceptance Criteria

1. THE Frontend SHALL validate all form inputs before submission
2. THE Backend SHALL validate all incoming request data before processing
3. WHEN numeric fields contain negative values, THE Backend SHALL return a validation error
4. WHEN text fields exceed reasonable length limits, THE Backend SHALL return a validation error
5. THE Backend SHALL sanitize all user-provided text to prevent injection attacks before storing in the Database
