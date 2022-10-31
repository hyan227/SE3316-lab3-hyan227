const { request } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

const parts = [
    {id: 100, name: 'Belt', color: 'brown', stock: 0},
    {id: 101, name: 'Clip', color: 'brown', stock: 0},
    {id: 102, name: 'Belt', color: 'red', stock: 0},
    {id: 103, name: 'Hat', color: 'Purple', stock: 0},
];

// Setup serving front-end code
app.use('/', express.static('static'));

// Setup middileware to do logging
app.use((request, respond, next)=> {
    console.log(`${request.method} request for ${request.url}`);
    next(); // keep going 
})

// Parse data in body as JSON
router.use(express.json());

router.get('/', (request, response)=> {
    response.send(parts);
});

// Get details for a given part
router.get('/:part_id', (request, respond)=>{
    const id = request.params.part_id;
    const part = parts.find(p => p.id === parseInt(id));
    if(part){
        respond.send(part);
    }
    else{
        respond.status(404).send(`Part ${id} was not found!`);
    }
}
);

router.put('/:id', (request, respond)=>{
    const newpart= request.body;
    console.log("Part: ", newpart);
    // Add ID field
    newpart.id = parseInt(request.params.id);
    // Replace the part with the new one.
    const part = parts.findIndex(p => p.id === parseInt(newpart.id));
    if(part < 0){
        console.log('Creating new part');
        parts.push (request.body);
    }
    else{
        console.log('Modifying part', request.params.id);
        parts[part] = request.body;
    }

    respond.send(newpart);
});

// Update stock level or post request
router.post('/:id', (request, respond) =>{
    const newpart = request.body;
    console.log("Part: ", newpart);

    //Find the part 
    const part = parts.findIndex(p => p.id === parseInt(request.params.id));

    if(part<0){
        respond.status(404),send(`Part ${request.params.id} not found`);
    }
    else{
        console.log('Changing stock for ', request.params.id);
        parts[part].stock += parseInt(request.body.stock);
        respond.send(request.body);
    }
})

// Install the router at /api/parts
app.use('/api/parts', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
