import React from 'react'
import ShowAll from './ShowAll';
import CreateOne from './CreateOne';
import { Link, Switch, Route } from 'react-router-dom';
import ShowOne from './ShowOne';


const PlayerMain = (props) => {
    return (
        <>
            <Switch>
                <Route path="/players/list">
                    <div>
                        <Link to="/players/list" style={{ fontWeight: "bold" }}>List</Link>
                        <span>  |  </span>
                        <Link to="/players/addplayer">Add Player</Link>
                    </div>
                    <ShowAll />
                </Route>
                <Route path="/players/addplayer">
                    <div>
                        <Link to="/players/list">List</Link>
                        <span>  |  </span>
                        <Link to="/players/addplayer" style={{ fontWeight: "bold" }}>Add Player</Link>
                    </div>
                    <CreateOne />
                </Route>
                <Route path="/players/:id">
                    <h2>Player Details</h2>
                    {/* <p>Currently a worrk in progress</p> */}
                    <ShowOne />
                </Route>
            </Switch>
        </>
    )
}

export default PlayerMain