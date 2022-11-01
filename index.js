const { request, response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
app.use('/', express.static('static'));
 // Parse data in body as JSON
router.use(express.json());

// Setup middileware to do logging
app.use((request, respond, next)=> {
     console.log(`${request.method} request for ${request.url}`);
      next();// keep going
 }); 

var genres = [];
var albums = [];
var artists = [];
var tracks = [];


const fs = require('fs'); 
const parse = require('csv-parser');


fs.createReadStream('lab3-data/genres.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', (data) => genres.push(data))
    .on('end',() => {
      //do something with data
      console.log(genres);
    });

fs.createReadStream('lab3-data/raw_albums.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', (data) => albums.push(data))
    .on('end',() => {
      //do something with data
      console.log(albums);
    });

fs.createReadStream('lab3-data/raw_artists.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', (data) => artists.push(data))
    .on('end',() => {
      //do something with data
      console.log(artists);
    });

fs.createReadStream('lab3-data/raw_tracks.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', (data) => tracks.push(data))
    .on('end',() => {
      //do something with data
      console.log(tracks);
    });

app.get('/api/genres', (request, respond) =>{
         respond.send(genres);
})

app.get('/api/albums', (request, respond) =>{
    respond.send(albums);
})

app.get('/api/artists', (request, respond) =>{
    respond.send(artists);
})

app.get('/api/tracks', (request, respond) =>{
    respond.send(tracks);
})

// 1st Question 

app.get('/api/genres/:genre_id', (request, respond)=>{
    const id = request.params.genre_id;
    const genre = genres.find(p => p.genre_id === id);
    if(genre){
        delete genre.top_level;
    delete genre['#tracks'];
        respond.send(genre);
    }
    else{
        respond.status(404).send(`Genre ${id} was not found!`);
    }
}
);













// const parts = [
//     {id: 100, name: 'Belt', color: 'brown', stock: 0},
//     {id: 101, name: 'Clip', color: 'brown', stock: 0},
//     {id: 102, name: 'Belt', color: 'red', stock: 0},
//     {id: 103, name: 'Hat', color: 'Purple', stock: 0},
// ];

// // Setup serving front-end code


// // Setup middileware to do logging
// app.use((request, respond, next)=> {
//     console.log(`${request.method} request for ${request.url}`);
//     next(); // keep going 
// })

// // Parse data in body as JSON
// router.use(express.json());

// router.get('/', (request, response)=> {
//     response.send(parts);
// });

// // Get details for a given part
// router.get('/:part_id', (request, respond)=>{
//     const id = request.params.part_id;
//     const part = parts.find(p => p.id === parseInt(id));
//     if(part){
//         respond.send(part);
//     }
//     else{
//         respond.status(404).send(`Part ${id} was not found!`);
//     }
// }
// );

// router.put('/:id', (request, respond)=>{
//     const newpart= request.body;
//     console.log("Part: ", newpart);
//     // Add ID field
//     newpart.id = parseInt(request.params.id);
//     // Replace the part with the new one.
//     const part = parts.findIndex(p => p.id === parseInt(newpart.id));
//     if(part < 0){
//         console.log('Creating new part');
//         parts.push (request.body);
//     }
//     else{
//         console.log('Modifying part', request.params.id);
//         parts[part] = request.body;
//     }

//     respond.send(newpart);
// });

// // Update stock level or post request
// router.post('/:id', (request, respond) =>{
//     const newpart = request.body;
//     console.log("Part: ", newpart);

//     //Find the part 
//     const part = parts.findIndex(p => p.id === parseInt(request.params.id));

//     if(part<0){
//         respond.status(404),send(`Part ${request.params.id} not found`);
//     }
//     else{
//         console.log('Changing stock for ', request.params.id);
//         parts[part].stock += parseInt(request.body.stock);
//         respond.send(request.body);
//     }
// })




// Install the router at /api/parts
app.use('/api/genres', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
