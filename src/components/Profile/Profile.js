import React, { Component } from 'react';
import axios from 'axios';
import { getUser } from '../../ducks/user';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            status: "add",
            fav_song: '',
            fav_song_id: 0,
            input: '',
        }
    }
    componentDidMount() {
        getUser()
        axios.get(`/get/favorite/song/${this.props.spotify_id}`).then(favSong => {
            if (favSong.data.length > 0) {
                this.setState({
                    fav_song: favSong.data[0].fav_song,
                    fav_song_id: favSong.data[0].fav_song_id,
                    status: "edit"
                })
            } else {
                this.setState({
                    status: "add"
                })
            }
        })
    }

    editFavoriteSong() {
        const { fav_song } = this.state
        axios.put(`/edit/favorite/song/${this.state.fav_song_id}`, { fav_song }).then(ok => {
            this.setState({
                input: '',
                status: 'edit'
            })
        })
    }

    deleteFavoriteSong() {
        axios.delete(`/delete/favorite/song/${this.state.fav_song_id}`).then(ok => {

        })
    }

    addFavoriteSong() {
        const { fav_song } = this.state
        axios.post(`/post/favorite/song/${this.props.spotify_id}`, {fav_song}).then(ok => {
            this.setState({
                input: '',
                status: 'edit'
            })
        })
    }

    render() {
        return (
            <div>
                <img src={''} alt='' />
                <h1>{this.props.user.displayName}</h1>
                <p>Favorite Song: {this.state.fav_song}</p>
                <input
                    style={{ display: (this.state.status === "submit" || this.state.status === 'addSong') ? "block" : "none" }}
                    value={this.state.fav_song}
                    onChange={e => this.setState({ fav_song: e.target.value })}
                />
                <button onClick={(this.state.status === 'edit') ? () => this.setState({status: 'submit'}) : (this.state.status === 'submit') ? () => this.editFavoriteSong() : (this.state.status === 'add') ? () => this.setState({status: 'addSong'}) : (this.state.status === 'addSong') ? () => this.addFavoriteSong() : null }>{(this.state.status) === "edit" ? "Edit" : this.state.status === "submit" ? "Submit" : "Add"}</button>
                <button onClick={() => this.deleteFavoriteSong()}>Delete</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        spotify_id: state.user.id,
        user: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Profile);