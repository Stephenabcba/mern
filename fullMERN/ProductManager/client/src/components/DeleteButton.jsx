import React from 'react';
import axios from 'axios';

const DeleteButton = (props) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(() => {
                console.log(`Item with id ${id} has been successfully deleted`)
                props.successCallback()
            }
            )
            .catch(err => console.log(err))
    }

    return (
        <>
            <button onClick={() => handleDelete(props.id)}>Delete</button>
        </>
    )
}

export default DeleteButton