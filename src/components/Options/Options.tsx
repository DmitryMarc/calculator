import { FC } from "react"
import styles from './Options.module.css'

const Options: FC = () => {
    const optionsList = ['/', 'x', '-', '+'].map((item) => (
        <div key={item} className={styles.btn}>
            <span className={styles.action}>{item}</span>
        </div>
    ))
    return (
        <>
            {optionsList}
        </>
    )
}

export default Options