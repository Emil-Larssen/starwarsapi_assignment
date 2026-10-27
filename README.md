## Running the application:
To run, first run "npm install" in the terminal, 
once completion finishes, input "npm start" in the terminal.


## Documentation:
documents included in the docs folder:
1. mermaid diagram of the architecture
2. postman collection of the API
3. endpoints.md file of the API

-----------------------
## Architecture choices BEFORE any coding
#### AI summarized architecture choices:
* The application core doesn't depend on Express or the frontend.  
* The domain is responsible for enforcing its own rules.  
* The service is responsible for data access, not deciding what constitutes a valid character.  
* Domain failures are communicated to the API without coupling the domain to HTTP.  
#### Additional notes by developer:
Validation is performed by the domain.  
Errors are returned from the domain to the API,  
which then returns appropriate HTTP codes to the client,  
Without making the domain aware of HTTP.    
Validation could simply be done by the API, but this way the application is easier to extend.  
The Emphasis in this application is on extendability and separation of concerns.    
This is a layered architecture not by convention but as a consequence of how responsibility has been divided.  
----------------------------------

## Architectural choices explained after coding:  
This Architectural choice evolved based on the requirements of the project.  
Reasoning from what was required by the app, a folder structure was chosen.    
This folder structure was also elected based on making modules easy to locate for the developer,   
and make it intuitive to work with.  
This structure then partially informed the architecture choices, based on the consideration on what each module should do.  
The application is now potentially easier to extend beyond its initial scope because it was also considered what would happen if the   
scope suddenly grew.
The domain should not know about HTTP or the frontend. As such the only access point to the backend allowed is the API.  
The application has a clear separation of responsibilities between the frontend, API, service, and domain layers.  
Each layer handles a distinct aspect of the application's functionality.
A tradeoff encountered in the project was that the service handles both data access and coordination of domain operations.  
If a larger app was to be developed, it would be necessary to separate these concerns further.

-----------------------------
## Testing:

The API was tested using Postman, covering GET, POST, PUT and DELETE operations, including successful requests and invalid inputs.  
Validation was tested to verify that invalid character data produces HTTP 400 responses with appropriate error messages,  
while nonexistent characters return 404.  
The frontend was tested to confirm that characters are retrieved and displayed correctly,  
new characters appear after creation, and backend validation errors are displayed to the user.  
The download and redirect endpoints were implemented and included in the API testing workflow.

## Use of AI generated code:
The application only relied on agentic coding for the frontend.  
The generation of HTML, CSS and the script.js.  
Afterwards the application was tested and incorrect behaviour identified and corrected.  
This led specifically to separating the style into a CSS file.  
Ensuring the frontend relied on the backend errors to display the correct error messages.  
(The AI had invented new frontend validations).

## AI code review findings acted upon:
High Priority: Incorrect Character Deletion

In characterService.js, the deleteCharacter() function uses findIndex() without checking whether a matching character exists.  
If no character is found, findIndex() returns -1, causing characters.splice(-1, 1) to delete the last character in the array.  
Although the API checks character existence through middleware, two concurrent DELETE requests targeting the same ID   
could both pass this check. The second request could then accidentally delete an unrelated character.

Solution:  
An explicit check for index === -1 before executing splice().  
If the character does not exist, the service returns 'NOT_FOUND' without modifying the array.  
This ensures that the service protects data integrity independently of the API's existence-checking middleware.