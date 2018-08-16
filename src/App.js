import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from './ducks/user';
import { withRouter } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import Content from './components/Content/Content';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Login from "./components/Login/Login";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faRandom } from '@fortawesome/free-solid-svg-icons'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faVolumeDown } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'


class App extends Component {
	componentDidMount() {
		this.props.getUser();
	}


	render() {
		library.add(faStepBackward, faPlayCircle, faStepForward, faPauseCircle, faPlus, faCheck, faAngleLeft, faAngleRight, faRandom, faRedo, faVolumeUp, faVolumeDown);
		library.add(faStepBackward, faPlayCircle, faStepForward, faPauseCircle, faPlus, faCheck, faAngleLeft, faAngleRight, faClock);
		return (
			<div className="App">
				{(this.props.user.id) ?
					<div>
						<div className="container">
							<SideBar />
							<Content />
						</div>
						<MusicPlayer />
					</div> :
					<Login />}
			</div>
		);
	}
}

export default withRouter(connect(({ user }) => ({ user }), { getUser })(App));