import React from 'react'
import NotFound from './NotFound'

const PlanetDisplay = (props) => {
    return (

        <>
            {(props.searchResult.name !== undefined) ?
                <>
                    <h2>{props.searchResult.name}</h2>
                    <p>Climate: {props.searchResult.climate}</p>
                    <p>Terrain: {props.searchResult.terrain}</p>
                    <p>Population: {props.searchResult.population} people</p>
                </>
                : <NotFound />}
        </>

    )
}

export default PlanetDisplay