import React from 'react'
import styles from "./TodoItem.module.css"

const TodoItem = (props) => {
    function handleComplete(e, todoIdx) {
        props.toggleCompleted(todoIdx)
    }
    const itemStyle = {
        textDecoration: props.item.completed ? "line-through" : "none"
    }
    return (
        <>
            {
                <li className={styles.itemRow}>
                    <p style={itemStyle}>{props.item.task}</p>
                    <input type="checkbox" name="completed" checked={props.item.completed} onChange={(e) => handleComplete(e, props.index)} />
                    <button className={styles.deleteButton} onClick={() => props.deleteTodo(props.index)}>Delete</button>
                </li>
            }
        </>
    )
}

export default TodoItem