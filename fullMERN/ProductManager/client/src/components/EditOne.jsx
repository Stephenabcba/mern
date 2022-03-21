import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';
import Form from './Form';

const EditOne = (props) => {
    const [id, setId] = useState("");
    const { id: idRoute } = useParams();
    const [product, setProduct] = useState({})
    const [loaded, setLoaded] = useState(false)
    const history = useHistory();
    if (id !== idRoute) {
        setId(idRoute);
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                console.log(response.data);
                setProduct(response.data.product)
                setLoaded(true)
            })
            .catch(error => console.log(error))
    }, [id])

    const submitForm = (title, price, description) => {
        console.log(title, price, description)
        axios.put(`http://localhost:8000/api/products/${id}`, { title: title, price: price, description: description })
            .then(result => {
                console.log("Modified:", result.data.product)
                history.push("/")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div>EditOne</div>
            {loaded &&
                <Form submitForm={submitForm} initialTitle={product.title} initialPrice={product.price} initialDescription={product.description} />}
        </>
    )
}

export default EditOne