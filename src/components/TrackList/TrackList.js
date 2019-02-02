import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          if (this.props.selected === track.selected) {
            return <Track name={track.name} artists={track.artists} album={track.album} icon={this.props.icon} key={track.id} id={track.id} moveItem={this.props.moveItem} />
          }
          
        })}
      </div>
    );
  }
}
export default TrackList;