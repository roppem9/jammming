let clientID = '0d03ae8b463b4f45bc5e141ab0f05a3f';
let redirectURI = 'http://localhost:3000/';
const urlAPI = 'https://accounts.spotify.com/authorize?';

let accessToken = '';
let expTime = '';

export const Spotify = {
	
	getAccessToken(term) {
		let url = window.location.href;
		if (accessToken) {
			return accessToken;
		} else if (url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)) {
			accessToken = url.match(/access_token=([^&]*)/)[1];
			expTime = url.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => accessToken = '', expTime * 1000);
			return accessToken;
		} else {
			console.log('redirect...');
			const queryUrl = urlAPI + `client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=playlist-modify-public`;
			window.location = queryUrl;
		}
	},

	search(term) {
		this.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
		{
			headers: { Authorization: `Bearer ${accessToken}` }
		})
		.then(response => response.json())
		.then(jsonResponse => {
			if (jsonResponse.tracks.items) {
				return jsonResponse.tracks.items.map(track => {
					return {
						id: track.id,
						uri: track.uri,
						name: track.name,
						artist: track.artists[0].name,
						album: track.album.name
					};
				});
			}
		});
	},

	getUserID() {
		return fetch('https://api.spotify.com/v1/me', {headers: {Authorization: `Bearer ${accessToken}`}})
			   .then(response => response.json())
			   .then(jsonResponse => {
			   		return jsonResponse.id;
			   	});
	},

	getPlaylistID(userID, playlistName) {
		return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
			   {
			   		method: 'POST',
			   		headers: new Headers ({
			   			'Content-Type': 'application/json',
			   			'Authorization': `Bearer ${accessToken}`
			   		}),

			   		body: JSON.stringify({name: playlistName})
			   	})
				.then(response => response.json())
				.then(jsonResponse => {
					return jsonResponse.id;
				});
	},

	addPlaylistTracks (userID, playlistID, uriArr) {
		fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
			{
				method: 'POST',
				headers: new Headers ({
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`
				}),
				body: JSON.stringify({uris: uriArr})
			})
			.then(response => response.json())
			.then(jsonResponse => {
				return;
			});
	},

	savePlaylist(playlistName, trackURIs) {
		if (!(playlistName && !trackURIs)) {
			return;
		}

		this.getUserId().then(userID => {
			this.getPlaylistID(userID, playlistName).then(playlistID => {
				this.addPlaylistTracks(userID, playlistID, trackURIs);
			});
		});
	}
};