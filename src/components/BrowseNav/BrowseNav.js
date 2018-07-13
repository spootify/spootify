import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BrowseNav extends Component {
	constructor() {
		super()
		this.state = {
			activeTab: 0
		}
	}
	render() {
		return (
			<div className='browse-nav'>
				<div>
					<div className='flexRow'>
						<div className='flexColumn navTabDiv'>
							<Link to='/home/browse/overview'><h3 className={this.state.activeTab === 0 ? 'activeTab' : null} onClick={() => this.setState({ activeTab: 0 })}>OVERVIEW</h3></Link>
							<div className={this.state.activeTab === 0 ? 'active' : 'none'}></div>
						</div>
						<div className='flexColumn navTabDiv'>
							<Link to='/home/browse/charts'><h3 className={this.state.activeTab === 1 ? 'activeTab' : null} onClick={() => this.setState({ activeTab: 1 })}>CHARTS</h3></Link>
							<div className={this.state.activeTab === 1 ? 'active' : 'none'}></div>
						</div>
						<div className='flexColumn navTabDiv'>
							<Link to='/home/browse/genres'><h3 className={this.state.activeTab === 2 ? 'activeTab' : null} onClick={() => this.setState({ activeTab: 2 })}>GENRES & MOODS</h3></Link>
							<div className={this.state.activeTab === 2 ? 'active' : 'none'}></div>
						</div>
						<div className='flexColumn navTabDiv'>
							<Link to='/home/browse/releases'><h3 className={this.state.activeTab === 3 ? 'activeTab' : null} onClick={() => this.setState({ activeTab: 3 })} >NEW RELEASES</h3></Link>
							<div className={this.state.activeTab === 3 ? 'active' : 'none'}></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BrowseNav;