import React, { Component } from 'react';

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faStepForward } from '@fortawesome/free-solid-svg-icons'
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons'

//Components
import './App.css';

//Routing
import routes from './routes';

class App extends Component {
  render() {
    library.add(faStepBackward, faPlayCircle, faStepForward, faPauseCircle);
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
