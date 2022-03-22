import React, { useState, useEffect } from 'react'
import Form from './Form'
import axios from 'axios'
import { useParams, Link, useHistory } from 'react-router-dom';

const UpdateOne = (props) => {
    const history = useHistory()
    const [initialName, setInitialName] = useState("")
    const [fetched, setFetched] = useState(false)
    const [errors, setErrors] = useState([])
    const { id } = useParams()
    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                console.log(res.data);
                setInitialName(res.data.author.name)
                setFetched((true))
            })
            .catch(err => console.log(err))
    }, [])

    const sendForm = (name) => {
        axios.put(`http://localhost:8000/api/authors/${id}`, { name })
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
            <h2>Edit this author</h2>
            {errors.map((error, idx) => {
                return (
                    <p className='error' key={idx}>{error}</p>
                )
            })}
            {fetched ? <Form initialName={initialName} sendForm={sendForm} /> : <p>Fetching...</p>}
        </>
    )
}

export default UpdateOne