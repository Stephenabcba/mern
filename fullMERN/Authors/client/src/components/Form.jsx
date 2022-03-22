import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Form = (props) => {
    const [name, setName] = useState(props.initialName)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.sendForm(name)
    }
    return (
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                    <span>Name: </span>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <div>
                    <Link to="/">Cancel</Link>
                    <button>Submit</button>
                </div>
            </form>
        </>
    )
}

export default Form