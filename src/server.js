const express = require('express');
const app = express();
const characterRepository = require('./backend/repositories/characterRepository');


//Starting the server
app.listen(3000, () => console.log('Server started on port 3000'));

//Initialized data
characterRepository.saveCharacter('Luke Skywalker', 'Jedi', 'Tatooine')
characterRepository.saveCharacter('Darth Vader', 'Sith', 'Tatooine');
characterRepository.saveCharacter('Leia Organa', 'Rebel', 'Alderaan');
characterRepository.saveCharacter('Han Solo', 'Smuggler', 'Corellia');

//api endpoints
const routes = require('./api/routes');
app.use(express.json());
app.use(routes);