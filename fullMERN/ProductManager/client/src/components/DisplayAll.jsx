import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'

const DisplayAll = (props) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        console.log("Fetching all products...")
        axios.get("http://localhost:8000/api/products")
            .then(response => setProducts(response.data.products))
            .catch(err => console.log(err))
    }, [props.newestProduct])

    const removeFromList = (id) => {
        setProducts(products.filter((product) => {
            if (product._id === id) {
                return false
            } else {
                return true
            }
        }))
    }

    return (
        <div>
            <h2>All Products:</h2>
            {/* <p>{JSON.stringify(products)}</p> */}
            {products.map((product, idx) => {
                return (
                    <p key={product._id}>
                        <Link key={idx} to={product._id}>{product.title}</Link>
                        <DeleteButton id={product._id} successCallback={() => removeFromList(product._id)} />
                    </p>
                )
            })}
        </div>
    )
}

export default DisplayAll