import { FC } from 'react';
import styles from './Display.module.css';

const Display: FC = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.display}>
                <span className={styles.value}>0</span>
            </span>
        </div>
    )
}

export default Display
