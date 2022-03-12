import React, { useContext } from 'react'
import NameContext from '../context/NameContext'
import styles from "./Form.module.css"

const Form = (props) => {
    const context = useContext(NameContext)
    return (
        <form onSubmit={e => e.preventDefault()}>
            <label className={styles.inputLabel}>
                <span>Name:</span>
                <input className={styles.formInput} type="text" name="name" value={context.name} onChange={e => context.setName(e.target.value)} placeholder="Mickey Mouse" />
            </label>
        </form>
    )
}

export default Form