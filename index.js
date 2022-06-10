
const { response } = require('express');
const express = require('express')
const app = express()

app.use(express.json());
app.set('view engine', 'ejs');

// json parser 

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain'})
//     response.end('Hello world')
// })


let persons = 
[
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]
// hard-coded list of notes in JSON format

app.get('/', (request,response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/info', (request, response) => {
    response.render("info.html.ejs", {
        peopleCount: persons.length,
        datetime: new Date()
    });
    response.end()
})

// CRUD: Read: Index
app.get('/api/persons', (request, response) => {
    response.json(persons);
    response.end();
})

// CRUD: Read: Show
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person !== undefined) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
// handler for HTTP GET requests made to notes path of application. response w json method 'response' object. send notes array that was passed as JSON string. 

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0;

    return maxId + 1;
}

app.post('/api/persons', (request,response) => {
    // console.log(71);
    // console.log(request.body)


    const requestName = request.body.name;
    const requestNumber = request.body.number;
    if (requestName === undefined || requestNumber === undefined) {
        response.status(400);
        response.end();
        return;
    }
    const newId = generateId();

    // console.log(78)
    // console.log(newId);

    const newPerson = {
        id: newId,
        name: requestName,
        number: requestNumber,
    }
    // console.log(83);
    // console.log(newPerson);

    persons.push(newPerson);
    // console.log(87);
    // console.log(persons);

    response.json({
        newPersonId: newId,
    })

    response.status(200);
    response.end();
})
// access data from the body property of request object. 


// CRUD: Delete
app.delete('/api/persons/:id', (request, response) => {
    const requestIdString = request.params.id;
    const requestId = Number(requestIdString)

    // console.log(125)
    // console.log(requestId);

    const newPersons = persons.filter(person => person.id !== requestId);
    // console.log(129)
    // console.log(newPersons)

    persons = newPersons;
    // console.log(133)
    // console.log(persons);

    response.status(200);
    response.end();
})
 

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
// bind server assigned to app variable, listen to HTTP  requests sent to the port 3001



// REST - narrow view, how RESTful APIs are understood in web applications

// singular things, like notes in above case, are called resources in RESTful thinking. Every resource has an associated URL which is the resource's unique address.

// One convention is to create the unique address for resources by combining the name of the resource type with the resource's unique identifier.

// Ex: root URL of our service is www.example.com/api. define the resource type of note to be notes, then the address of a note resource with the identifier 10, has the unique address www.example.com/api/notes/10.

// URL for the entire collection of all note resources is www.example.com/api/notes.

// We can execute different operations on resources. The operation to be executed is defined by the HTTP verb:

// URL          verb	functionality
// notes/10	    GET	    fetches a single resource
// notes	    GET	    fetches all resources in the collection
// notes	    POST	creates a new resource based on the request data
// notes/10	    DELETE	removes the identified resource
// notes/10	    PUT	    replaces the entire identified resource with the request data
// notes/10	    PATCH	replaces a part of the identified resource with the request data

// uniform interface, consistent way of defining interfaces so systems can co-operate
// second level of RESTful maturity. doesn't actually meet original criteria for REST API
