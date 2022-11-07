const { request, response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
app.use('/', express.static('static'));
// Parse data in body as JSON
router.use(express.json());

// Setup middileware to do logging
app.use((request, respond, next) => {
    console.log(`${request.method} request for ${request.url}`);
    next();// keep going
});

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://Haotian:133Gaosan%40@cluster0.aq5indq.mongodb.net/?retryWrites=true&w=majority';


async function connect() {
    try {
        await mongoose.connect(url);
        console.log("Connected to mongodb");
    }
    catch (error) {
        console.error(error);
    }
}
connect();






var genres = [];
var albums = [];
var artists = [];
var tracks = [];
var tracksList=[];

const fs = require('fs');
const parse = require('csv-parser');



fs.createReadStream('lab3-data/genres.csv')
    .pipe(parse({ delimiter: ':' }))
    .on('data', (data) => genres.push(data))
    .on('end', () => {
        //do something with data
        //   console.log(genres);
    });

fs.createReadStream('lab3-data/raw_albums.csv')
    .pipe(parse({ delimiter: ':' }))
    .on('data', (data) => albums.push(data))
    .on('end', () => {
        //do something with data
        //   console.log(albums);
    });

fs.createReadStream('lab3-data/raw_artists.csv')
    .pipe(parse({ delimiter: ':' }))
    .on('data', (data) => artists.push(data))
    .on('end', () => {
        //do something with data
        //   console.log(artists);
    });

fs.createReadStream('lab3-data/raw_tracks.csv')
    .pipe(parse({ delimiter: ':' }))
    .on('data', (data) => tracks.push(data))
    .on('end', () => {
        //do something with data
        //   console.log(tracks);
    });

app.get('/api/genres', (request, respond) => {
    respond.send(genres);
})

app.get('/api/albums', (request, respond) => {
    respond.send(albums);
})

app.get('/api/artists', (request, respond) => {
    respond.send(artists);
})

app.get('/api/tracks', (request, respond) => {
    respond.send(tracks);
})

// 1st Question 

app.get('/api/genres/:genre_id', (request, respond) => {
    const id = request.params.genre_id;
    const genre = genres.find(p => p.genre_id === id);
    if (genre) {
        delete genre.top_level;
        delete genre['#tracks'];
        respond.send(genre);
    }
    else {
        respond.status(404).send(`Genre ${id} was not found!`);
    }
}
);

// 2nd Question
app.get('/api/artists/ID/:artist_id', (request, respond) => {
    const id = request.params.artist_id;
    const artist = artists.find(p => p.artist_id === id);
    if (artist) {
        delete artist.artist_id;
        delete artist.artist_bio;
        delete artist.artist_image_file;
        delete artist.artist_images;
        delete artist.artist_members;
        delete artist.artist_related_projects
        respond.send(artist);
    }
    else {
        respond.status(404).send(`Artist ${id} was not found!`);
    }
}
);

// 3rd Question
app.get('/api/tracks/ID/:track_id', (request, respond) => {
    const id = request.params.track_id;
    const track = tracks.find(p => p.track_id === id);
    if (track) {
        const dupTrack = {};
        dupTrack.album_id = track.album_id;
        dupTrack.album_title = track.album_title;
        dupTrack.artist_id = track.artist_id;
        dupTrack.artist_name = track.artist_name;
        dupTrack.tags = track.tags;
        dupTrack.track_date_created = track.track_date_created;
        dupTrack.track_date_recorded = track.track_date_recorded;
        dupTrack.track_duration = track.track_duration;
        dupTrack.track_genres = track.track_genres;
        dupTrack.track_number = track.track_number;
        dupTrack.track_title = track.track_title;
        respond.send(dupTrack);
    }
    else {
        respond.status(404).send(`Track ${id} was not found!`);
    }
}
);

// 4th question 1
app.get('/api/albums/Title/:album_title', (request, respond) => {
    const title = request.params.album_title;
    const album = tracks.find(p => p.album_title === title);
    if (album) {
        const trackIDs = tracks.filter(i => i.album_title == title).map(i => i.track_id)
        const trackFilter = trackIDs.slice(0, 6);
        respond.send(trackFilter);
    }
    else {
        respond.status(404).send(`Album title ${title} was not found!`);
    }
}
);

// 4th question 2
app.get('/api/tracks/Title/:track_title', (request, respond) => {
    const title = request.params.track_title;
    const track = tracks.find(p => p.track_title === title);
    if (track) {
        const trackIDs = tracks.filter(i => i.track_title == title).map(i => i.track_id)
        const trackFilter = trackIDs.slice(0, 6);
        respond.send(trackFilter);
    }
    else {
        respond.status(404).send(`Track title ${title} was not found!`);
    }
}
);

// 5th question
app.get('/api/artists/Name/:artist_name', (request, respond) => {
    const name = request.params.artist_name;
    const artist = artists.find(p => p.artist_name === name);
    if (artist) {
        const artistNames = artists.filter(i => i.artist_name == name).map(i => i.artist_id)
        respond.send(artistNames);
    }
    else {
        respond.status(404).send(`Artist name ${name} was not found!`);
    }
}
);

// 6th question
app.post('/api/tracksList/Title/:track_title', (request, respond) => {
    const title = request.params.track_title;
    const track = tracks.find(p => p.track_title === title);
    if (track) {
        if(tracksList.includes(track) == false){
            tracksList.push(track);
            respond.send(tracksList);
        }
        else
         respond.status(404).send(`Track ${title} already existed!`);
        
    }
    else {
        respond.status(404).send(`Track title ${title} was not found!`);
    }
}
);













app.use('/api/genres', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


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

