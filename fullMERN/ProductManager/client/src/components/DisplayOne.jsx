import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const DisplayOne = (props) => {
    const [product, setProduct] = useState({})
    const [id, setId] = useState(1)
    let { id: urlId } = useParams()
    // console.log(urlId)
    if (urlId !== id) {
        setId(urlId)
    }
    useEffect(() => {
        console.log(`Fetching product with _id of ${id}`);
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(response => setProduct(response.data.product))
            .catch(err => console.log(err))
    }, [id])
    return (
        <>
            {/* <h2>Product Details</h2> */}
            {product.title ?
                <>
                    <h2>{product.title}</h2>
                    <p>Price: ${product.price.toFixed(2)}</p>
                    <p>Description: {product.description}</p>
                </>
                : ''}
        </>
    )
}

export default DisplayOne