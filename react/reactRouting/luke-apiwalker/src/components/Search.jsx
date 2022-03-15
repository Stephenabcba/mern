import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

const Search = (props) => {
    const { setSearch, categories } = props;
    const [selectedCategory, setSelectedCategory] = useState("people");

    const [idQuery, setIdQuery] = useState(1);
    let history = useHistory();
    const handleInput = (e) => {
        switch (e.target.name) {
            case "idQuery":
                if (!isNaN(e.target.value)) {
                    setIdQuery(e.target.value)
                }
                break;
            case "category":
                setSelectedCategory(e.target.value)
                break;
            default:
                break;
        }
    }

    const processForm = (e) => {
        e.preventDefault()
        // setSearch("https://swapi.dev/api/planets/1/?format=wookiee")
        history.push(`/${selectedCategory}/${idQuery}`)
        // setSearch(categories[selectedCategory] + idQuery)
    }
    return (
        <form onSubmit={e => processForm(e)}>
            <label>
                <span>Search for: </span>
                <select name="category" id="category" onChange={e => handleInput(e)}>
                    {Object.entries(categories).map((category, idx) =>
                        <option value={category[0]} key={idx}>{category[0]}</option>
                    )}
                </select>
            </label>
            <label><span>ID: </span> <input type="text" value={idQuery} name="idQuery" onChange={e => handleInput(e)} /></label>
            <button>Search</button>
        </form>
    )
}

export default Search