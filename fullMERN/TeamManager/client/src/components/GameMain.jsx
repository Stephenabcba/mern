import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const GameMain = (props) => {
    const { gameNum } = useParams()
    const [players, setPlayers] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/players")
            .then(res => {
                console.log(res.data);
                setPlayers(res.data.players)
            })
    }, [])

    const changeStatus = (statusCode, playerId, playerStatuses) => {
        // console.log(statusCode, playerId, playerStatuses);
        if (playerStatuses[gameNum - 1] === statusCode) {
            console.log("no change needed");
            return
        }
        const newStatus = playerStatuses.map((curStatus, idx) => {
            if (idx === gameNum - 1) {
                return statusCode
            } else {
                return curStatus
            }
        })
        axios.put(`http://localhost:8000/api/players/${playerId}`, {
            statuses: newStatus
        })
            .then(res => {
                console.log(res.data);
                setPlayers(players.map(player => {
                    if (player._id !== playerId) {
                        return player
                    } else {
                        return res.data.player
                    }
                }))
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Player Status - Game {gameNum}</h1>
            <div>
                <Link to="/status/game/1">Game 1</Link>
                <span>  |  </span>
                <Link to="/status/game/2">Game 2</Link>
                <span>  |  </span>
                <Link to="/status/game/3">Game 3</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player =>
                        <tr key={player._id}>
                            <td><Link to={`/players/${player._id}`}>{player.name}</Link></td>
                            <td>
                                <button className={player.statuses[gameNum - 1] === 2 ? 'playing' : ''} onClick={() => changeStatus(2, player._id, player.statuses)}>Playing</button>
                                <button className={player.statuses[gameNum - 1] === 1 ? 'notPlaying' : ''} onClick={() => changeStatus(1, player._id, player.statuses)}>Not Playing</button>
                                <button className={player.statuses[gameNum - 1] === 0 ? 'undecided' : ''} onClick={() => changeStatus(0, player._id, player.statuses)}>Undecided</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default GameMain