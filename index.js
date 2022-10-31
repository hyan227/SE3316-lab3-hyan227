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

// Get details for a given part
app.get('/api/parts/:part_id', (request, respond)=>{
    const id = request.params.part_id;
    console.log(`GET request for ${request, respond}`);
    const part = parts.find(p => p.id === parseInt(id));
    if(part){
        respond.send(part);
    }
    else{
        respond.status(404).send(`Part ${id} was not found!`);
    }
}
);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
