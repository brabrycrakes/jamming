import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(event) {
    this.props.moveItem(this.props);

    if (this.props.icon === '+') {
      console.log('Add to playlist');
      //Remove from search results array and add to playlist array
      //Or, if single array, just mark selected: true.
    }
    else if (this.props.icon === '-') {
      console.log('Remove from playlist');
      //Remove from playlist array and add to search results array
      //Or, if single array, just mark selected: false.      
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artists} | {this.props.album}</p>
        </div>
        <a className="Track-action" onClick={this.handleMove}>{this.props.icon}</a>
      </div>
    );
  }
}
export default Track;