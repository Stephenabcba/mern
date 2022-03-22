import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';


const ShowAll = (props) => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log(res.data)
                setAuthors(res.data.authors)
            }
            )
            .catch(err => console.log(err))
    }, [])

    const filterDelete = (deleteId) => {
        setAuthors(authors.filter((author) => {
            if (author._id === deleteId) {
                return false
            } else {
                return true
            }
        }))
    }

    return (
        <>
            <Link to='/new'>Add an author</Link>
            <p>We have quotes by:</p>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => {
                        return (
                            <tr key={author._id}>
                                <td>{author.name}</td>
                                <td>
                                    <Link to={`/edit/${author._id}`}>Edit</Link>
                                    <DeleteButton delId={author._id} callback={() => filterDelete(author._id)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ShowAll