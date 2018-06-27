import React from 'react';

//Routing Modules
import {Switch, Route} from 'react-router-dom';

//Components
import Overview from './Overview';
import Charts from './Charts';
import Genres from './Genres';
import NewReleases from './NewReleases';

export default (
    <Switch>
        <Route path="/dashboard/browse/overview" component={Overview} />
        <Route path="/dashboard/browse/charts" component={Charts} />
        <Route path="/dashboard/browse/genres" compnonent={Genres} />
        <Route path="/dashboard/browse/releases" component={NewReleases} />
    </Switch>
)