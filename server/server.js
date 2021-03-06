require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const massive = require('massive');
const bodyParser = require('body-parser');
const axios = require('axios');
const Spotify = require('spotify-web-api-node');
const stringify = require('json-stringify-safe');
const profile_controller = require('./profile_controller');

let contextUri = '';

const scope = 'user-read-private user-read-email user-read-birthdate user-top-read user-read-recently-played user-library-modify user-library-read playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private user-follow-modify user-follow-read user-read-currently-playing user-read-playback-state user-modify-playback-state streaming';

const sp = new Spotify({
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.CALLBACK_URL
})

sp.clientCredentialsGrant().then(
	function (data) {
		console.log('The access token expires in ' + data.body['expires_in']);
		console.log('The access token is ' + data.body['access_token']);

		// Save the access token so that it's used in future calls
		sp.setAccessToken(data.body['access_token']);
	},
	function (err) {
		console.log(
			'Something went wrong when retrieving an access token',
			err.message
		);
	}
);

const {
	SERVER_PORT,
	SESSION_SECRET,
	CLIENT_ID,
	CLIENT_SECRET,
	CALLBACK_URL,
	CONNECTION_STRING
} = process.env;

const app = express();
app.use(bodyParser.json());

//Massive Connection To Database
massive(CONNECTION_STRING).then(db => {
	console.log('Connected to Database')
	app.set('db', db);
})

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Tokens
let accToken;
let refToken;

passport.use(new SpotifyStrategy({
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	callbackURL: CALLBACK_URL,
}, (accessToken, refreshToken, expires_in, profile, done) => {
	let db = app.get('db');
	let { provider, id, username, displayName, profileUrl, photos, country, followers, product } = profile;

	accToken = accessToken;
	refToken = refreshToken;

	db.find_user([id]).then((foundUser) => {
		if (foundUser[0]) {
			done(null, foundUser[0].spotify_id)
		} else {
			db.create_user([provider, id, username, displayName, profileUrl, photos[0], country, followers, product])
				.then(user => {
					console.log(user)
					return done(null, user.spotify_id)
				})
		}
	})
}
));

passport.serializeUser((id, done) => {
	done(null, id);
})

passport.deserializeUser((id, done) => {
	app.get('db').find_session_user([id]).then(user => {
		done(null, user[0]);
	})
})

app.get('/test/endpoint', (req, res) => {
	let testData = ['hello', 'how', 'are', 'you'];
	res.status(200).send(testData)
})

//Favorite Song Endpoints
app.get('/get/favorite/song/:spotify_id', profile_controller.getFavoriteSong)
app.post('/post/favorite/song/:spotify_id', profile_controller.addFavoriteSong)
app.put('/edit/favorite/song/:fav_song_id', profile_controller.editFavoriteSong)
app.delete('/delete/favorite/song/:fav_song_id', profile_controller.deleteFavoriteSong)

//Passport Spotify End Points
app.get('/auth/spotify', passport.authenticate('spotify', {
	scope: scope,
	showDialog: true
}));

app.get('/auth/spotify/callback', passport.authenticate('spotify', {
	successRedirect: process.env.SUCCESS_REDIRECT,
	failureRedirect: process.env.FAILURE_REDIRECT
}))

//End Points
app.get('/auth/me', (req, res) => {
	if (req.user) {
		res.status(200).send([req.user, accToken, refToken]);
	} else {
		res.status(401).send('Nope, not you loser')
	}
})


// Spotify Data End Points
app.get('/spotify/browse/featuredPlaylists', (req, res) => {
	sp.getFeaturedPlaylists().then(featuredPlayLists => {
		res.send(featuredPlayLists)
	}).catch(err => {
		res.send(err)
	})
})

app.get('/spotify/browse/newReleases', (req, res) => {
	sp.getNewReleases().then(newReleases => {
		res.send(newReleases)
	}).catch(err => {
		res.send(err)
	})
})

app.get('/spotify/browse/categories', (req, res) => {
	sp.getCategories().then(categories => {
		res.send(categories)
	}).catch(err => {
		res.send(err)
	})
})

app.get('/spotify/search/tracks/:search', (req, res) => {
	const { search } = req.params
	sp.searchTracks(search).then(results => {
		res.send(results)
	})
})

app.get('/spotify/search/artists/:search', (req, res) => {
	const { search } = req.params
	sp.searchArtists(search).then(results => {
		res.send(results)
	})
})

app.get('/spotify/search/albums/:search', (req, res) => {
	const { search } = req.params
	sp.searchAlbums(search).then(results => {
		res.send(results)
	})
})

app.get('/spotify/search/playlists/:search', (req, res) => {
	const { search } = req.params
	sp.searchPlaylists(search).then(results => {
		res.send(results)
	})
})

app.get('/spotify/playlist/:ownerId/:playlistId', (req, res) => {
	const { ownerId, playlistId } = req.params
	sp.getPlaylist(ownerId, playlistId).then(playlist => {
		res.send(playlist)
	})
})

app.get('/spotify/category/:categoryId', (req, res) => {
	const { categoryId } = req.params
	sp.getPlaylistsForCategory(categoryId).then(category => {
		res.send(category)
	})
})

app.get('/spotify/album/:albumId', (req, res) => {
	const { albumId } = req.params
	sp.getAlbum(albumId).then(album => {
		res.send(album)
	})
})

app.get('/spotify/user/:userId', (req, res) => {
	const { userId } = req.params
	sp.getUser(userId).then(user => {
		res.send(user)
	})
})

app.get('/spotify/tracks/:offset', (req, res) => {
	const { offset } = req.params
	axios.get(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
		headers: {
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(result => {
		res.status(200).send(stringify(result))
	})
})

app.get('/spotify/saved/albums', (req, res) => {
	axios.get('https://api.spotify.com/v1/me/albums', {
		headers: {
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(result => {
		res.status(200).send(stringify(result))
	})
})

app.get('/spotify/recent/tracks', (req, res) => {
	axios.get('https://api.spotify.com/v1/me/player/recently-played', {
		headers: {
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(recentlyPlayed => {
		res.status(200).send(stringify(recentlyPlayed))
	})
})

app.get('/spotify/check/saved/tracks', (req, res) => {
	const { ids } = req.body
	axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(result => {
		res.status(200).send(stringify(result))
	}).catch(err => {
		res.send(err)
	})
})

app.get('/spotify/saved/playlists', (req, res) => {
	axios.get('https://api.spotify.com/v1/me/playlists', {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(result => {
		res.status(200).send(stringify(result))
	})
})
//Music Player EndPoints

// Get recently played
app.get('/get/recently/played', (req, res) => {
	axios.get('https://api.spotify.com/v1/me/player/recently-played', {
		headers: {
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(response => {
		res.status(200).send(stringify(response))
	})
})

// Get Currently Playing song
app.get('/currently/playing', (req, res) => {
	axios.get('https://api.spotify.com/v1/me/player', {
		headers: {
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(response => {
		res.status(200).send(stringify(response))
	})
})

//Pause Current Playing Info
app.get('/pause/song', (req, res) => {
	let body = JSON.stringify({ 'context_uri': contextUri })
	axios.put('https://api.spotify.com/v1/me/player/pause', body, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(response => {
		res.status(200).send('Music Paused');
	})
})

//Play Paused Track
app.put('/resume/track', (req, res) => {
	let { deviceID, playlistUri } = req.body;
	let trackUri = []
	trackUri.push(playlistUri);
	console.log(trackUri)
	console.log(accToken)
	let body = {
		"uris": trackUri
	}
	axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, body, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(response => {

		res.status(200).send('Music Resumed')
	})
})

//Skip To Next Track
app.post('/skip/next/track', (req, res) => {
	let { deviceID } = req.body;
	let body = JSON.stringify({ 'context_uri': contextUri })
	axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${deviceID}`, body, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(response => {
		res.status(200).send(stringify(response));
	})
})

//Skip To Previous Track
app.post('/previous/track', (req, res) => {
	let { deviceID } = req.body;
	let body = JSON.stringify({ 'context_uri': contextUri })
	axios.post(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceID}`, body, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(response => {
		res.status(200).send('Skipped to previous track')
	})

})

// Get Available Devices
app.get('/available/devices', (req, res) => {
	axios.get(`https://api.spotify.com/v1/me/player/devices`, {
		headers: {
			"Authorization": "Bearer" + ' ' + accToken
		}
	}).then(response => {
		res.status(200).send(response.data.devices[0].id)
	})
})


app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`));