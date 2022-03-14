import React, { useEffect, useState } from 'react'

const Display = (props) => {
    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=2000")
            .then(r => r.json())
            .then(result => result.results.map((pokemon) => pokemon.name))
            .then(pokemonNames => setPokemons(pokemonNames))
    }, [])
    return (
        <div>
            {pokemons.map((pokemonName, idx) =>
                <li key={idx}>{idx}: {pokemonName}</li>
            )}
        </div>
    )
}

export default Display