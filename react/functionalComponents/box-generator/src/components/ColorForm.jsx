import React, { useState } from 'react'
import styles from "./ColorForm.module.css"

const ColorForm = (props) => {

    // each input is a state
    const [color, setColor] = useState("");
    const [sideLength, setSideLength] = useState(0);

    // creates a new box property when "add" button is pressed
    // defaults side length to 100 if the value was invalid
    function handleSubmit(e) {
        e.preventDefault();
        // props.submitColor(color)
        props.makeBox({
            color: color,
            sideLength: (Number.isNaN(sideLength) || parseInt(sideLength) <= 0) ?
                100
                : sideLength
        })
        // reset input
        setColor("")
        setSideLength(0)
    }

    // change handler for color input
    function handleColor(e) {
        setColor(e.target.value)
    }

    // change handler for sideLength input
    function handleSideLength(e) {
        setSideLength(e.target.value)
    }


    return (
        <form onSubmit={e => handleSubmit(e)}>
            <label>
                <span>Color:</span>
                <input type="text" name="color" value={color} onChange={(e) => handleColor(e)} />
            </label>
            <label>
                <span>Side Length:</span>
                <input type="number" name="sideLength" value={sideLength} onChange={(e) => handleSideLength(e)} />
            </label>
            <button>Add</button>
        </form>
    )
}

export default ColorForm