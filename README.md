To run, input "npm start" in the terminal.

-----------------------
## Architecture choices
#### AI summarized architecture choices:
* The application core doesn't depend on Express or the frontend.  
* The domain is responsible for enforcing its own rules.  
* The repository is responsible for data access, not deciding what constitutes a valid character.  
* Domain failures are communicated to the API without coupling the domain to HTTP.  
#### Additional notes by developer:
Validation is done exclusively by the domain.
Errors are returned from the domain to the API, 
which then returns appropriate HTTP codes to the client,
Without making the domain aware of HTTP.  
The application is slightly over-engineered for its scope as validaiton could simply be done by the API, but this way the application is able to scale beyond its initial scope.
The Emphasis in this application is on scalability and separation of concerns, which means longer development time than building only for current known scale.  
This is a layered architecture not by convention but as a consequence of how responsibility has been divided.