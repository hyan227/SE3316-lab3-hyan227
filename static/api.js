function createNode(element){
    return document.createElement(element);
}

function append(parent, el){
    return parent.appendChild(el);
}

function getGenres(){

    fetch("/api/genres")
    .then(res => res.json()
    .then(data =>{
        const list = document.getElementById('test');
        data.forEach(element => {
            const item = document.createElement('li');
            item.appendChild(document.createTextNode(`${element.genre_id}, ${element.title}`));
            list.appendChild(item);
        });
    })
    )
}

getGenres();

function getTrack(){
    inputText = document.getElementById("trackInput").value;
    var count =0;
    fetch("/api/tracks")
    .then(respond => respond.json()
    .then(val =>{
        const list = document.getElementById('test');

        val.forEach(element => {
            if(element.track_title === inputText){
               count++;
            }
        }
        );
        if(inputText.length !=0 && count>0){
            fetch(`/api/tracksTitle/title/${inputText}`)
    .then(res => res.json()
    .then(data =>{
        // console.log(data);
        // const list = document.getElementById('test');
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
            const item = document.createElement('li');
            genre_id = document.createTextNode(`${data.album_id}, ${data.album_title}, ${data.artist_name}, ${data.track_number},${data.track_title}`);
            item.appendChild(genre_id);
            list.appendChild(item);
            console.log(inputText);
        
    })
    )
        }
        else if(inputText.length !=0)
        {
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            const item = document.createElement('li');
            genre_id = document.createTextNode(`no result`);
            item.appendChild(genre_id);
            list.appendChild(item);
            console.log(inputText);
        }
        else{
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            getGenres();
        }
    })
    )



    
}

function searchMusic(){
    inputText = document.getElementById("trackID")
    fetch("/api/tracks")
    .then(res => res.json()
    .then(data =>{
        // console.log(data);
        const list = document.getElementById('test');
        data.forEach(element => {
            const item = document.createElement('li');
            genre_id = document.createTextNode(`${element.genre_id}, ${element.title}`);
            item.appendChild(genre_id);
            list.appendChild(item);
        });
    })
    )
}












