import React from 'react';

//Routeer-DOM
import {Switch, Route} from 'react-router-dom';

//Components
import Browse from '../Browse/Browse';
import RecentlyPlayed from '../RecentlyPlayed/RecentlyPlayed';
import Songs from '../Songs/Songs';
import Albums from '../Albums/Albums';
import Artists from '../Artists/Artists';

export default (
    <Switch>
        <Route path="/dashboard/browse" component={Browse} />
        <Route path="/dashboard/recent" component={RecentlyPlayed}/>
        <Route path="/dashboard/songs" component={Songs}/>
        <Route path="/dashboard/albums" component={Albums}/>
        <Route path="/dashboard/artists" component={Artists}/>
        <Route path="" component={'#'}/>
    </Switch>
)
