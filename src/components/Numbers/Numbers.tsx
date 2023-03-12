import { FC } from "react"
import styles from './Numbers.module.css'

const Numbers: FC = () => {
    const numbersList = [...Array(11)].map((_, index, array) => {
        const value = index !== array.length - 1 ? array.length - 2 - index : ',';
        return (
            <div key={value} className={styles.number}>
                <span className={styles.sumbol}>{value}</span>
            </div>
        )
    })
    return (
        <>
            {numbersList}
        </>
    )
}

export default Numbers
