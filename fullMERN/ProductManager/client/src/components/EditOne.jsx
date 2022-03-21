import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

const EditOne = (props) => {
    const [id, setId] = useState("");
    const { id: idRoute } = useParams();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const history = useHistory();
    if (id !== idRoute) {
        setId(idRoute);
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response => {
                console.log(response.data);
                const { title: titleFetched, price: priceFetched, description: descriptionFetched } = response.data.product;
                setTitle(titleFetched);
                setPrice(priceFetched);
                setDescription(descriptionFetched);
            })
            .catch(error => console.log(error))
    }, [id])

    const submitForm = (e) => {
        e.preventDefault()
        console.log(title, price, description)
        axios.put(`http://localhost:8000/api/products/${id}`, { title: title, price: price, description: description })
            .then(result => {
                console.log("Modified:", result.data.product)
                // props.setNewestProduct(result.data.product)
                // setTitle("")
                // setPrice(0)
                // setDescription("")
                history.push("/")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div>EditOne</div>
            <form onSubmit={submitForm}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="formInput">
                        <label><span>Title</span><input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Batmobile" /> </label>
                    </div>
                    <div className="formInput">
                        <label><span>Price</span><input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} /> </label>
                    </div>
                    <div className="formInput">
                        <label><span>Description</span><input type="text" name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Very expensive car" /> </label>
                    </div>
                </div>
                <button>Update</button>
            </form>
        </>
    )
}

export default EditOne