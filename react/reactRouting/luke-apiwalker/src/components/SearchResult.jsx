import React from 'react'
import { useState, useEffect } from 'react'
import {
    useParams
    // useHistory
} from "react-router-dom";

const SearchResult = (props) => {
    // set up state and get params from route
    const { query, id } = useParams();
    const [rendered, setRendered] = useState(false);

    // console.log(query, id)
    // set search parameter
    useEffect(() => {
        props.setSearch(props.categories[query] + id);
    })
    // run the query
    useEffect(() => {
        // console.log("fetching from results")
        setRendered(false)
        fetch(props.search)
            .then(r => r.json())
            .then(result => {
                props.setSearchResult(result)
            })
            .then(() => setRendered(true))
            .catch(err => console.log(err))
    }, [props.search])
    return (
        <>
            {rendered ? props.children : <h3>Working hard to get your query...</h3>}
        </>
    )
}

export default SearchResult