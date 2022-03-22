import React from 'react'
import axios from 'axios'

const DeleteButton = (props) => {
    const handleDelete = () => {
        console.log(props.delId);
        axios.delete(`http://localhost:8000/api/authors/${props.delId}`)
            .then(res => {
                console.log(res.data);
                props.callback()
            })
            .catch(err => console.log(err))
    }
    return (
        <button onClick={handleDelete}>Delete</button>
    )
}

export default DeleteButton