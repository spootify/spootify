import {Switch, Route} from 'react-router-dom';
// Components
import Browse from '../Browse/Browse';

export default (
	<Switch>
		<Route path="/browse" component={Browse}/>
	</Switch>
)