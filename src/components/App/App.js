import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    };
    this.searchSpotify = this.searchSpotify.bind(this);
    this.saveToSpotify = this.saveToSpotify.bind(this);
    this.getSelectedTracks = this.getSelectedTracks.bind(this);
    this.moveItem = this.moveItem.bind(this);
  }
  searchSpotify(term) {
    let tracks = this.getSelectedTracks();  //remove all tracks that are not selected
    Spotify.search(term).then(searchResultsTracks => {
      for (let i = 0, addTrack; i < searchResultsTracks.length; i++) {
        addTrack = true;
        for (let j=0; j < tracks.length; j++) {
          if (searchResultsTracks[i].id === tracks[j].id) {
            addTrack = false;
            break;
          }
        }
        if (addTrack) {
          tracks.push(searchResultsTracks[i]); //If search result not already added to the playlist, add it to tracks.
        }
      }
      this.setState({
        tracks: tracks
      });
    });
  }
  saveToSpotify(name) {
    const tracksToSave = this.getSelectedTracks();
    const trackIds = tracksToSave.map(track => `spotify:track:${track.id}`);
    Spotify.save(name, trackIds);
  }
  getSelectedTracks() {
    const tracks = this.state.tracks.slice();
    const selectedTracks = tracks.filter(track => track.selected);
    return selectedTracks;
  }
  moveItem(item) {
    const tracks = this.state.tracks.slice();
    for (var i=0; i < tracks.length; i++) {
      if (tracks[i].id === item.id) {
        tracks[i].selected = !tracks[i].selected;
        this.setState({
          tracks: tracks
        });
        return;
      }
    }
  }
  render() {
    return (
      <div className="App">
        <SearchBar searchSpotify={this.searchSpotify} />
        <div className="App-playlist">
          <SearchResults tracks={this.state.tracks} moveItem={this.moveItem} selected={false} />
          <Playlist tracks={this.state.tracks} moveItem={this.moveItem} selected={true} saveToSpotify={this.saveToSpotify}/>
        </div>      
      </div>
    );
  }
}

export default App;
