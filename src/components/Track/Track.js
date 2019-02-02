import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(event) {
    this.props.moveItem(this.props);
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