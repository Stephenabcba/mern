import React, { useContext } from 'react'
import NameContext from '../context/NameContext'
import styles from "./Navbar.module.css"

const Navbar = (props) => {
    const context = useContext(NameContext)
    return (
        <p className={styles.navbar}>Hi, {context.name}</p>
    )
}

export default Navbar