import React from 'react'
import styles from "./Taskbar.module.css"

export default function Taskbar({ time,Pin,  imageName, selectedOption, imageWifi, selectedOptionWifi, pinWidth, pinColor }) {
  return (
    <div className={`${styles.taskbar}`}>
      <div className={`${styles.timePhone}`}>{time}</div>
      <div className={styles.taskbarRight}>
        {imageName && <img className={`${styles.imageSong}`} src={imageName} alt={`WIFI${selectedOption}`} />}
        {imageWifi && <img className={`${styles.imageWifi}`} src={imageWifi} alt={`WIFI${selectedOptionWifi}`} />}
        <span className={`${styles.boxPin}`}>
          <div className={`pin-container position-relative ${styles.pinne}`}>
            <img className='position-absolute' src={Pin} alt='pin' />
            <div className="position-absolute" style={{ height: 11, width: `calc(${pinWidth} + 2px)`, backgroundColor: pinColor }}></div>
          </div>
        </span>
      </div>

    </div>

  )
}
