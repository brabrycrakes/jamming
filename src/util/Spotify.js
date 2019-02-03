
const clientId = 'ee334b6ec78d4c3abb4a441c084e0cae';
const spotifyAuthorizeBaseURL = 'https://accounts.spotify.com/authorize';
const redirectURL = 'http://localhost:3000/';
let token;

const Spotify = {
  getToken() {
    if(token) {
      return token;
    }

    const urlHasToken = window.location.href.match(/access_token=([^&]*)/);
    const urlHasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlHasToken && urlHasExpiresIn) {
        token = urlHasToken[1];
        const expiresIn = Number(urlHasExpiresIn[1]);

        window.setTimeout(() => token = '', expiresIn * 1000);
        window.history.pushState('Token', null, '/');
        return token;
    } else {
      const scopes = 'playlist-modify-public';
      const spotifyAuthorizeURL = `${spotifyAuthorizeBaseURL}?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectURL}`;
      window.location = spotifyAuthorizeURL;
    }
  },
  search(term) {
    const token = this.getToken();

    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      return response.json();
    }).then((jsonResponse) => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map((track) => {
            return {
              id: track.id,
              name: track.name,
              album: track.album.name,
              artists: track.artists[0].name,
              selected: false
            }
          });
        }
      }
    );
  },
  save(name, trackIds) {
    if (!name || !trackIds.length) {
      return;
    }

    const token = this.getToken();
    let userId;
    return fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({name: name})
        }).then(response => response.json()
        ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify({uris: trackIds})
            });
        });
    });
  }
};

export default Spotify;
