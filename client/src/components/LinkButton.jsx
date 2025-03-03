import React from 'react'
import styles from './LinkButton.module.css'
const LinkButton = ({ img, title, layout, customStyles = {}, backgroundColor, color, font }) => {

    return (
        <div className={styles[layout]} style={{
            ...customStyles,
            // backgroundColor,
            color,
            fontFamily: font
        }
        }>

            <div>
                <img src={img} alt={title} />
            </div>
            <p>{title}</p>
        </div>
    )
}

export default LinkButton