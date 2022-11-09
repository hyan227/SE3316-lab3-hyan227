const { request, response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
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
var list = [];
var tracksList= {};

const fs = require('fs');
const parse = require('csv-parser');



fs.createReadStream('lab3-data/genres.csv')
    .pipe(parse({ delimiter: ':' }))
    .on('data', (data) => genres.push(data))
    .on('end', () => {
        //do something with data
    });

fs.createReadStream('lab3-data/raw_albums.csv')
    .pipe(parse({ delimiter: ':' }))
    .on('data', (data) => albums.push(data))
    .on('end', () => {
        //do something with data
    });

fs.createReadStream('lab3-data/raw_artists.csv')
    .pipe(parse({ delimiter: ':' }))
    .on('data', (data) => artists.push(data))
    .on('end', () => {
        //do something with data
    });

fs.createReadStream('lab3-data/raw_tracks.csv')
    .pipe(parse({ delimiter: ':' }))
    .on('data', (data) => tracks.push(data))
    .on('end', () => {
        //do something with data
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
// improved 3rd question for Front-end
app.get('/api/tracksTitle/title/:track_title', (request, respond) => {
    const title = request.params.track_title;
    const track = tracks.find(p => p.track_title === title);
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
        respond.status(404).send(`Track ${title} was not found!`);
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

app.get('/api/albumsTitle/:album_title', (request, respond) => {
    const title = request.params.album_title;
    const album = tracks.find(p => p.album_title === title);
    if (album) {
        respond.send(album);
    }
    else {
        respond.status(404).send(`Album title ${title} was not found!`);
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

app.get('/api/artistsName/:artist_name', (request, respond) => {
    const name = request.params.artist_name;
    const artist = artists.find(p => p.artist_name === name);
    if (artist) {
        respond.send(artist);
    }
    else {
        respond.status(404).send(`Artist name ${name} was not found!`);
    }
}
);

// 6th question
app.post('/api/tracksList/Name/:tracksList_name', (request, respond) => {
    const trackTitle = request.body;
    const name = request.params.tracksList_name;
    if (tracksList.hasOwnProperty(name) == false) {
        tracksList[name] = null;
        respond.send(tracksList);
    }
    else {
        respond.status(404).send(`list name ${name} has already existed!`);
    }
    
}
);
// 7th question
app.put('/api/trackIDList/Name/:tracksList_name', (request, respond) => {
    const newTrack = request.body;
    const name = request.params.tracksList_name;
    const track = tracks.find(p => parseInt(p.track_id) === newTrack.track_id);
    if (track) {
        if(tracksList.hasOwnProperty(name) == true){
            tracksList[name] = newTrack.track_id;
            respond.send(tracksList); 
        }else{
            respond.status(404).send(`List ${name} was not found!`);
        }
    
    }
    else {
        respond.status(404).send(`Track ID ${parseInt(newTrack.track_id)} was not found!`);
    }
}
);
// 8th question 
app.get('/api/tracksList/ID/:tracksList_name', (request, respond) => {
    const name = request.params.tracksList_name;
    if (tracksList[name] == true) {
        const trackIDs = tracks.filter(i => i.track_title == title).map(i => i.track_id)
        const trackFilter = trackIDs.slice(0, 6);
        respond.send(trackFilter);
    }
    else {
        respond.status(404).send(`Track title ${title} was not found!`);
    }
}
);

const MongoDBList = require('./schema');

app.post("/api/list", async(request, respond) =>{

    const newList = await MongoDBList.isList(request.body.listname);
    if(!newList){
        return respond.status(404).send(`List already exist`);
    }else{

        const defineNewList = new MongoDBList({
            listname: request.body.listname,
            id: request.body.id,
        });
        
        const val = await defineNewList.save();
        respond.json(val);

    }
})

app.get("/api/list/:listname",(request,respond) => {
    const name = request.params.listname;
    MongoDBList.find(({listname:name}), function(err, val){
        
        if(val.length == 0){
            respond.status(404).send(`List Does Not Exist`);
        }
        else{
            respond.send(val);
        }
})
});

app.use('/api/genres', router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


