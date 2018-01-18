import React from 'react';
import './Track.css';

export class Track extends React.Component {
	
	constructor(props) {
		super(props);
		this.renderAction = this.renderAction.bind(this);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}

	renderAction() {
		return this.props.isRemoval ? '-' : '+';
	};

	addTrack() {
        this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	render() {
		return (
			<div className="Track">
				{/*<iframe src={`https://open.spotify.com/embed?uri=${this.props.uri}`}
						frameBorder="0"
						allowtransparency="true"
						height="80px"
						width="640px"></iframe>*/}
  				<div className="Track-information">
    				<h3>{this.props.track.name}</h3>
    				<p>{this.props.track.artist} | {this.props.track.album}</p>
  				</div>
  				<a className="Track-action" onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>{this.renderAction()}</a>
			</div>
		);
	}
}