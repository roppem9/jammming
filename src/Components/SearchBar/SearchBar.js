import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {term: ''};
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
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
		}
	}

	render() {
		return (
			<div className="SearchBar">
  				<input placeholder="Enter a Song Title"
  					   onChange={this.handleTermChange}
  					   onKeyPress={this.handleKeyPress} />
  				<a onClick={this.search}>SEARCH</a>
			</div>
		);
	}
}