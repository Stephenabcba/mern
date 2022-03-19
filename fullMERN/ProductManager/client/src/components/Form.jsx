import React, { useState } from 'react'
import axios from 'axios';

const Form = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    const submitForm = (e) => {
        e.preventDefault()
        console.log(title, price, description)
        axios.post("http://localhost:8000/api/products", { title: title, price: price, description: description })
            .then(result => {
                console.log("Added:", result.data.product)
                props.setNewestProduct(result.data.product)
                setTitle("")
                setPrice(0)
                setDescription("")
            })
            .catch(err => console.log(err))
    }

    return (
        <>
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
                <button>Create</button>
            </form>
        </>
    )
}

export default Form