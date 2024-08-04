const express = require('express');
const app = express();
const today = new Date();

const persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const note = `PhoneBook has info for ${persons.length} people
                ${today}
`;

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/info', (req, res) => {
  res.json(note);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const newPerson = req.body;

  // Validate that the required fields are present
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  // Check if the name already exists
  const nameExists = persons.some((person) => person.name === newPerson.name);
  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  // Generate a new unique ID using Math.random()
  const newId = Math.floor(Math.random() * 1000000);

  const personToAdd = { id: newId, ...newPerson };

  // Add the new person to the array
  persons = persons.concat(personToAdd);

  // Send the added person back as the response
  res.status(201).json(personToAdd);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
