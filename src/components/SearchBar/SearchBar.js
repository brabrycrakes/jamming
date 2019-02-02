import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      term: ''
    }
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value});
  }

  handleSearch(event) {
    let term = this.state.term;
    term = term.replace(/ /g,"%20");
    this.props.searchSpotify(term);
    event.preventDefault();
  }

  render() {
   return (
    <div className="SearchBar">
      <input placeholder="Enter a song, artist, or album" onChange={this.handleTermChange} />
      <a onClick={this.handleSearch}>SEARCH</a>
    </div>
   );
  }
}

export default SearchBar;