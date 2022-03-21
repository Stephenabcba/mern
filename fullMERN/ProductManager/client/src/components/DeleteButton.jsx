import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const DeleteButton = (props) => {
    const history = useHistory();
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/products/${id}`)
            .then(() => {
                console.log(`Item with id ${id} has been successfully deleted`)
                history.push("/")
                if (props.removeFromList) {
                    props.removeFromList(id)
                }
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