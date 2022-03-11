import React, { useState } from 'react'
import styles from "./Tabs.module.css"

const Tabs = (props) => {
    const [activeTabIdx, setActiveTabIdx] = useState(-1)
    const [activeTabHead, setActiveTabHead] = useState(null)

    const randomCallback = (e, message) => {
        console.log(message)
        const tabContent = document.getElementById("tabContent")
        tabContent.classList.add("animate")
    }



    const changeTab = (e, tabIdx, callback) => {
        if (activeTabHead) {
            activeTabHead.className = styles.nonActive
        }
        e.target.className = styles.active
        setActiveTabHead(e.target)
        setActiveTabIdx(tabIdx)
        callback(e, "Changing to tab # " + tabIdx)
    }
    return (
        <div>
            {props.tabs.map((tab, idx) => <button key={idx} onClick={(e) => changeTab(e, idx, randomCallback)} className={styles.nonActive}>{tab.label}</button>)}
            <div className={styles.flex}>
                <p className={styles.tabContentText} id="tabContent" onAnimationEnd={e => e.target.classList.remove("animate")}>{activeTabIdx >= 0 ? props.tabs[activeTabIdx].content : ""}</p>
            </div>
        </div>
    )
}

export default Tabs