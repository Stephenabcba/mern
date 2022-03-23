import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const ShowOne = (props) => {
    const { id } = useParams();
    const [player, setPlayer] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/players/${id}`)
            .then(res => {
                console.log(res.data);
                setPlayer(res.data.player)
            })
    }, [id])

    return (
        <div>
            <h2>{player.name}</h2>
            <p>Preferred Postition: {player.prefPosition ? player.prefPosition : "None"}</p>
            <h3>Game Status</h3>
            {player.statuses ? player.statuses.map((status, idx) => {
                let statusMsg = ""
                switch (status) {
                    case 0:
                        statusMsg = "Undecided"
                        break;
                    case 1:
                        statusMsg = "Not Playing"
                        break;
                    case 2:
                        statusMsg = "Playing"
                        break;
                }
                return <p key={idx}>Game {idx}: {statusMsg}</p>
            }) : ''}
        </div>
    )
}

export default ShowOne