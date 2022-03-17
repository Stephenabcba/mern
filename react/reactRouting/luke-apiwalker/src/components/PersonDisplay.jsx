import React from 'react'
import { useState, useEffect } from 'react'
import {
    Link,
} from "react-router-dom";
import NotFound from './NotFound';

const PersonDisplay = (props) => {
    const [homeWorld, setHomeWorld] = useState("")
    // const { id } = useParams();
    // console.log(id)

    useEffect(() => {
        if (props.searchResult.result === undefined && props.searchResult.detail === undefined && props.searchResult.mass !== undefined) {
            fetch(props.searchResult.homeworld)
                .then(r => r.json())
                .then(result => setHomeWorld(result))
                .catch(err => console.log(err))
        }
    }, [])

    // useEffect(() => {
    //     console.log("fetching")
    //     fetch(props.search)
    //         .then(r => r.json())
    //         .then(result => {
    //             props.setSearchResult(result)
    //         })
    // }, [props.search])



    return (
        <>
            <h2>People Search Result</h2>
            {/* <p>search result {JSON.stringify(props.searchResult)}</p>
            <p>search result {JSON.stringify(homeWorld)}</p> */}
            {
                (props.searchResult.name !== undefined) ?
                    <>
                        <h2>{props.searchResult.name}</h2>
                        <p>Height: {props.searchResult.height} cm</p>
                        <p>Mass: {props.searchResult.mass} kg</p>
                        <p>Hair Color: {props.searchResult.hair_color}</p>
                        <p>Homeworld: {homeWorld.name}</p>
                        {props.searchResult.homeworld && <Link to={"/planets/" + props.searchResult.homeworld.split("/")[5]}>Homeworld</Link>}
                    </>
                    : <NotFound />
            }
        </>
    )
}

export default PersonDisplay