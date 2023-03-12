import { FC } from 'react';
import styles from './Display.module.css';

const Display: FC = () => {
    return (
        <span className={styles.display}>
            <span className={styles.value}>0</span>
        </span>
    )
}

export default Display
