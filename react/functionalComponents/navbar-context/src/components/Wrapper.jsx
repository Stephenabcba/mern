import React, { useState } from 'react'
import NameContext from '../context/NameContext'

const Wrapper = (props) => {
    const [name, setName] = useState("Mickey Mouse")
    return (
        <>
            <NameContext.Provider value={{ name, setName }}>
                {props.children}
            </NameContext.Provider>
        </>
    )
}

export default Wrapper