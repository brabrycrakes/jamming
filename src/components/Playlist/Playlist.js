import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);    
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      name: 'New Playlist',
    };
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value});
  }
  handleSave(event) {
    this.props.saveToSpotify(this.state.name);
    event.preventDefault();
  }
  render() {
   return (
    <div className="Playlist">
      <input value={this.state.name} onChange={this.handleNameChange}/>
      <TrackList tracks={this.props.tracks} selected={this.props.selected} icon="-" moveItem={this.props.moveItem} />
      <a className="Playlist-save" onClick={this.handleSave}>SAVE TO SPOTIFY</a>
  </div>
   );
  }
}

export default Playlist;