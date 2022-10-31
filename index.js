const express = require('express');
const app = express();
const port = 3000;

const parts = [
    {id: 100, name: 'Belt', color: 'brown'},
    {id: 101, name: 'Clip', color: 'brown'},
    {id: 102, name: 'Belt', color: 'red'},
    {id: 103, name: 'Hat', color: 'Purple'},
];

// Setup serving front-end code
app.use('/', express.static('static'));

app.get('/api/parts', (request, response)=> {
    console.log(`GET request for ${request.url}`);
    response.send(parts);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
