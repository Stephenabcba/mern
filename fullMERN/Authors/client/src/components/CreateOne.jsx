import React, { useState } from 'react'
import Form from './Form'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateOne = () => {
    const history = useHistory()

    const [errors, setErrors] = useState([])
    const sendForm = (name) => {
        axios.post(`http://localhost:8000/api/authors`, { name })
            .then(res => {
                console.log(res.data);
                history.push("/")
            })
            .catch(err => {
                // console.log(err.response.data.errors)
                const errArr = []
                const errorsObj = err.response.data.errors
                for (let error in errorsObj) {
                    console.log(error, "error: ", errorsObj[error].message);
                    errArr.push(errorsObj[error].message)
                }
                setErrors(errArr)
            })
    }
    return (
        <>
            <Link to='/'>Home</Link>
            <h2>Add a new author:</h2>
            {errors.map((error, idx) => {
                return (
                    <p className='error' key={idx}>{error}</p>
                )
            })}
            <Form initialName="" sendForm={sendForm} />
        </>
    )
}

export default CreateOne