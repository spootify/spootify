module.exports = {
    getFavoriteSong: (req, res) => {
        const { spotify_id } = req.params
        req.app.get('db').get_Fav_Song([spotify_id]).then(favSong => {
            res.status(200).send(favSong)
        })
    },
    addFavoriteSong: (req, res) => {
        const { fav_song } = req.body
        const { spotify_id } = req.params
        req.app.get('db').add_fav_song([spotify_id, fav_song]).then(ok => {
            res.sendStatus(200)
        })
    },
    editFavoriteSong: (req, res) => {
        const { fav_song } = req.body
        const { fav_song_id } = req.params
        req.app.get('db').edit_fav_song([fav_song, fav_song_id]).then(ok => {
            res.sendStatus(200)
        })
    },
    deleteFavoriteSong: (req, res) => {
        const { fav_song_id } = req.params
        req.app.get('db').delete_fav_song([fav_song_id]).then(ok => {
            res.sendStatus(200)
        })

    }
}