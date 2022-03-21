import React, { useState } from 'react'

const Form = (props) => {
    const [title, setTitle] = useState(props.initialTitle);
    const [price, setPrice] = useState(props.initialPrice);
    const [description, setDescription] = useState(props.initialDescription);

    const handleSubmit = (e) => {
        e.preventDefault()
        props.submitForm(title, price, description)
        setTitle("")
        setPrice(0)
        setDescription("")
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button>Submit</button>
            </form>
        </>
    )
}

export default Form