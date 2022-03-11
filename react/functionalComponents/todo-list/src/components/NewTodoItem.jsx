import React, { useState } from 'react'
import styles from "./NewTodoItem.module.css"

const NewTodoItem = (props) => {
    const [todoItem, setTodoItem] = useState("")

    function submitForm(e) {
        e.preventDefault()
        if (todoItem.length < 1) {
            return
        }
        props.addItem({ task: todoItem, completed: false })
        setTodoItem("")
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <input type="text" name="todoItem" value={todoItem} onChange={e => setTodoItem(e.target.value)} />
                <button className={styles.addButton}>Add</button>
            </form>
        </div>

    )
}

export default NewTodoItem