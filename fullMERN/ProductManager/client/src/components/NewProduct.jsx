import React from 'react'
import axios from 'axios';
import Form from './Form';

const NewProduct = (props) => {
    const submitForm = (title, price, description) => {
        console.log(title, price, description)
        axios.post("http://localhost:8000/api/products", { title: title, price: price, description: description })
            .then(result => {
                console.log("Added:", result.data.product)
                props.setNewestProduct(result.data.product)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Form submitForm={submitForm} initialTitle="" initialPrice={0} initialDescription="" />
        </>
    )
}

export default NewProduct