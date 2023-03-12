import { FC } from "react"
import styles from './EqualSign.module.css'

const EqualSign: FC = () => {
    return (
        <div className={styles.equal}>
            <span className={styles.sumbol}>=</span>
        </div>
    )
}

export default EqualSign
