import { FC } from "react"
import styles from './EqualSign.module.css'

const EqualSign: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.equal}>
                <span className={styles.sumbol}>=</span>
            </div>
        </div>
    )
}

export default EqualSign
