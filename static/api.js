function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function getGenres() {
  fetch("/api/genres").then((res) =>
    res.json().then((data) => {
      const list = document.getElementById("test");
      data.forEach((element) => {
        const item = document.createElement("li");
        item.appendChild(
          document.createTextNode(
            `${element.genre_id}, ${element.parent}, ${element.title}`
          )
        );
        list.appendChild(item);
      });
    })
  );
}

getGenres();

// 1st question
function getTrack() {
  inputText = document.getElementById("trackInput").value;
  var count = 0;
  fetch("/api/tracks").then((respond) =>
    respond.json().then((val) => {
      const list = document.getElementById("test");

      val.forEach((element) => {
        if (element.track_title === inputText) {
          count++;
        }
      });
      if (inputText.length != 0 && count > 0) {
        fetch(`/api/tracksTitle/title/${inputText}`).then((res) =>
          res.json().then((data) => {
            while (list.hasChildNodes()) {
              list.removeChild(list.firstChild);
            }
            const item = document.createElement("li");
            track_id = document.createTextNode(
              `${data.album_id}, ${data.album_title}, ${data.artist_name}, ${data.track_number},${data.track_title}`
            );
            item.appendChild(track_id);
            list.appendChild(item);
            console.log(inputText);
          })
        );
      } else if (inputText.length != 0) {
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
        const item = document.createElement("li");
        track_id = document.createTextNode(`no result`);
        item.appendChild(track_id);
        list.appendChild(item);
        console.log(inputText);
      } else {
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
        getGenres();
      }
    })
  );
}

// 1st question
function getArtist() {
  inputText = document.getElementById("artistInput").value;
  var count = 0;
  fetch("/api/artists").then((respond) =>
    respond.json().then((val) => {
      const list = document.getElementById("test");

      val.forEach((element) => {
        if (element.artist_name === inputText) {
          count++;
        }
      });
      if (inputText.length != 0 && count > 0) {
        fetch(`/api/artistsName/${inputText}`).then((res) =>
          res.json().then((data) => {
            while (list.hasChildNodes()) {
              list.removeChild(list.firstChild);
            }
            const item = document.createElement("li");
            artist_id = document.createTextNode(
              `${data.artist_name}, ${data.artist_id}, ${data.artist_date_created}, ${data.artist_url}`
            );
            item.appendChild(artist_id);
            list.appendChild(item);
            console.log(inputText);
          })
        );
      } else if (inputText.length != 0) {
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
        const item = document.createElement("li");
        artist_id = document.createTextNode(`no result`);
        item.appendChild(artist_id);
        list.appendChild(item);
        console.log(inputText);
      } else {
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
        getGenres();
      }
    })
  );
}

// 1st question
function getAlbum() {
  inputText = document.getElementById("albumInput").value;
  var count = 0;
  fetch("/api/albums").then((respond) =>
    respond.json().then((val) => {
      const list = document.getElementById("test");

      val.forEach((element) => {
        if (element.album_title === inputText) {
          count++;
        }
      });
      if (inputText.length != 0 && count > 0) {
        fetch(`/api/albumsTitle/${inputText}`).then((res) =>
          res.json().then((data) => {
            while (list.hasChildNodes()) {
              list.removeChild(list.firstChild);
            }
            const item = document.createElement("li");
            album_id = document.createTextNode(
              `${data.album_title}, ${data.album_id}, ${data.artist_name}, ${data.track_explicit}`
            );
            item.appendChild(album_id);
            list.appendChild(item);
            console.log(inputText);
          })
        );
      } else if (inputText.length != 0) {
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
        const item = document.createElement("li");
        album_id = document.createTextNode(`no result`);
        item.appendChild(album_id);
        list.appendChild(item);
        console.log(inputText);
      } else {
        while (list.hasChildNodes()) {
          list.removeChild(list.firstChild);
        }
        getGenres();
      }
    })
  );
}
