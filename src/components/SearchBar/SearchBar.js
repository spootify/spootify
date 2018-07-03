import React, { Component } from 'react';
import "./SearchBar.css";
import DownArrow from './down-arrow.svg';
import { getUser } from '../../ducks/user';
import { connect } from 'react-redux';

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            user: {}
        }
    }
    componentDidMount() {
        getUser()
    }
    render() {
        console.log(this.props.user)
        return (
            <div className='searchBar'>
                <div className='searchDiv'>
                    <img className='icon' src={DownArrow}
                        alt='backward'
                    />
                    <img className='icon' src={DownArrow}
                        alt='forward'
                    />
                    <input
                        className="searchInput"
                        placeholder="Search"
                    />
                </div>
                <div id='profileDiv' className='searchDiv'>
                    <img src={this.props.user.image} alt={this.props.user.displayName} style={{height: "30px", borderRadius: "50%"}}/>
                    <p>{this.props.user.displayName}</p>
                    <img
                        className='icon'
                        src={DownArrow}
                        alt='profile menu'
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SearchBar);