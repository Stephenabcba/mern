import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const CreateOne = (props) => {
    const [name, setName] = useState("")
    const [prefPosition, setPrefPosition] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/players", { name, prefPosition })
            .then(res => {
                console.log("added", res.data)
                history.push("/players/list")
            })
            .catch(err => {
                console.log(err.response.data)
                const errArr = []
                for (let error in err.response.data.errors) {
                    errArr.push(err.response.data.errors[error].message)
                }
                setErrors(errArr)
            })
    }
    return (
        <>
            {/* <p>Name: {JSON.stringify(name)}, Preferred Position: {JSON.stringify(prefPosition)}</p> */}
            <h2>Add Player</h2>
            {errors.map((error, idx) =>
                <p key={idx} className="errorMsg">{error}</p>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <span>Player Name:</span>
                        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Preferred Position:</span>
                        <input type="text" name="prefPosition" value={prefPosition} onChange={e => setPrefPosition(e.target.value)} />
                    </label>
                </div>
                <button className='submitBtn'>Add</button>
            </form>
        </>
    )
}

export default CreateOne