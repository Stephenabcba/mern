import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
const ShowAll = (props) => {
    const [players, setPlayers] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/api/players")
            .then(res => {
                console.log(res.data);
                setPlayers(res.data.players)
            })
    }, [])

    const handleDelete = (deleteId, playerName) => {
        if (window.confirm(`Are you sure you want to remove ${playerName}?`)) {
            axios.delete(`http://localhost:8000/api/players/${deleteId}`)
                .then(() => {
                    console.log(`Successfully deleted ${playerName}`);
                    setPlayers(players.filter(player => {
                        if (player._id === deleteId) {
                            return false
                        } else {
                            return true
                        }
                    }))
                })
                .catch(err => console.log(err.response))
        }
    }
    return (
        <>
            {/* <p>{JSON.stringify(players)}</p> */}
            <table>
                <thead>
                    <tr>
                        <th>Player Name</th>
                        <th>Perferred Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player._id}>
                            <td><Link to={`/players/${player._id}`}>{player.name}</Link></td>
                            <td>{player.prefPosition ? player.prefPosition : "No preferred Postion Chosen"}</td>
                            <td><button onClick={() => handleDelete(player._id, player.name)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ShowAll