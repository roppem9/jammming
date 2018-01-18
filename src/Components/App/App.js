import React from 'react';
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [],
                   playlistName: 'New Playlist',
                   playlistTracks: [] };
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track) {
    let isNew = 1;
    let trackArr = this.state.playlistTracks;
    trackArr.forEach(trackIn => {
      trackIn.id === track.id ? isNew = 0 : isNew = 1;
    });

    if(isNew) {
      trackArr.push(track);
      this.setState({ playlistTracks: trackArr });
    }
  }

  removeTrack(track) { 
    let trackArr = this.state.playlistTracks;
    trackArr.forEach((trackIn, n) => {
      if(trackIn.id === track.id) {
        trackArr.splice(n, 1);
      }
    });

    this.setState({ playlistTracks: trackArr });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    });

    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({ 
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  search(term) {
    Spotify.search(term).then(tracksArr => {
      this.setState({ searchResults: tracksArr });
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults}
                               onAdd={this.addTrack} />
                <Playlist playlistName={this.state.playlistName}
                          playlistTracks={this.state.playlistTracks}
                          onRemove={this.removeTrack}
                          onNameChange={this.updatePlaylistName}
                          onSave={this.savePlaylist} />
            </div>
          </div>
      </div>
    );
  }
}
