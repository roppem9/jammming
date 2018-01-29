import React from 'react';
import './SearchBar.css';
import { Spotify } from '../../util/Spotify';

export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { term: '',
									 placeholder: 'Search by song, artist, or album',
									 resultHeader: '' };
		
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleTermSubmit = this.handleTermSubmit.bind(this);
	}

	search() {
		this.props.onSearch(this.state.term);
	}

	handleTermChange(e) {
		this.setState({ term: e.target.value });
	}

	handleKeyPress(e) {
		let code = (e.keyCode ? e.keyCode : e.which);
		if (code === 13) {
			e.preventDefault();
			this.search();
			this.handleTermSubmit();
		}
	}

	handleTermSubmit() {
		this.mainInput.value = '';
		this.setState({ term: '',
										placeholder: 'Search for something else',
		 								resultHeader: `You searched for: "${this.state.term}"`});
	}

	render() {

		return (
			<div className="SearchBar">
  				<h3 className="SearchConfirmation">{this.state.resultHeader}</h3>
  					<input ref={ (input) => { this.mainInput = input; }}
  							 	 placeholder={this.state.placeholder}
  							 	 onChange={this.handleTermChange}
  							 	 onKeyPress={this.handleKeyPress} />
  					<button type="submit" onClick={this.handleTermSubmit}
  				   >SEARCH</button>
			</div>
		);
	}
}