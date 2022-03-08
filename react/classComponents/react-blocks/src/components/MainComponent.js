import React, { Component } from 'react'
import styles from "./MainComponent.module.css"

class Main extends Component {
    render() {
        console.log(this.props.children)
        return (
            <div className={styles.main}>
                {this.props.children}
            </div>
        )
    }
}

export default Main